// Break Odds Engine — MAIN world fetch interceptor
// Runs at document_start via manifest "world": "MAIN"
// Captures break IDs and break data from Whatnot's GraphQL API calls
(function() {
  if (window.__boNetIntercept) return;
  window.__boNetIntercept = true;
  window.__boQueue = [];

  function post(msg) {
    window.postMessage(msg, '*');
    window.__boQueue.push(msg);
  }

  function findBreakIds(obj, depth) {
    if (!obj || typeof obj !== 'object' || depth > 10) return;
    if (Array.isArray(obj)) { for (var i = 0; i < obj.length; i++) findBreakIds(obj[i], depth + 1); return; }
    var id = obj.id;
    if (id && /^\d+$/.test(String(id))) {
      if (obj.totalBreakSpots || obj.spotType || obj.format || obj.breakSpotCount || (obj.title && /break/i.test(obj.title))) {
        post({ type: 'BO_BREAK_ID', payload: { breakId: String(id) } });
      }
    }
    if (obj.breakId && /^\d+$/.test(String(obj.breakId))) {
      post({ type: 'BO_BREAK_ID', payload: { breakId: String(obj.breakId) } });
    }
    for (var k in obj) { if (obj.hasOwnProperty(k)) { try { findBreakIds(obj[k], depth + 1); } catch (e) {} } }
  }

  var origFetch = window.fetch;
  window.fetch = async function() {
    var args = arguments;
    var url = (typeof args[0] === 'string') ? args[0] : args[0]?.url || '';
    if (/graphql/i.test(url)) {
      post({ type: 'BO_GQL_URL', payload: { url: url.split('?')[0] } });
      try {
        var body = typeof args[1]?.body === 'string' ? JSON.parse(args[1].body) : null;
        var vid = body?.variables?.id;
        var vbid = body?.variables?.breakId;
        var opName = body?.operationName || '';
        if (/break/i.test(opName) && vid && /^\d+$/.test(String(vid))) {
          post({ type: 'BO_BREAK_ID', payload: { breakId: String(vid) } });
        }
        if (vbid && /^\d+$/.test(String(vbid))) {
          post({ type: 'BO_BREAK_ID', payload: { breakId: String(vbid) } });
        }
      } catch (e) {}
    }
    var response = await origFetch.apply(this, args);
    try {
      if (/graphql/i.test(url)) {
        var clone = response.clone();
        clone.json().then(function(json) {
          var breakId = null;
          try {
            var body2 = typeof args[1]?.body === 'string' ? JSON.parse(args[1].body) : null;
            breakId = body2?.variables?.id || null;
          } catch (e) {}
          if (json?.data?.getBreak) {
            breakId = breakId || json.data.getBreak.id;
            post({ type: 'BO_API_DATA', payload: { breakData: json.data.getBreak, breakId: breakId } });
          }
          if (breakId && /^\d+$/.test(String(breakId))) {
            post({ type: 'BO_BREAK_ID', payload: { breakId: String(breakId) } });
          }
          try { findBreakIds(json?.data, 0); } catch (e) {}
        }).catch(function() {});
      }
    } catch (e) {}
    return response;
  };

  // Scan __NEXT_DATA__ for break IDs (Next.js SSR data)
  function scanNextData() {
    try {
      if (window.__NEXT_DATA__) {
        findBreakIds(window.__NEXT_DATA__, 0);
      }
    } catch (e) {}
  }

  // Run after DOM loads to catch SSR data
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(scanNextData, 500); });
  } else {
    setTimeout(scanNextData, 500);
  }

  // Listen for messages from content script (ISOLATED world)
  window.addEventListener('message', function(event) {
    if (event.source !== window) return;
    if (event.data && event.data.type === 'BO_DRAIN_QUEUE') {
      for (var i = 0; i < window.__boQueue.length; i++) {
        window.postMessage(window.__boQueue[i], '*');
      }
      window.__boQueue = [];
    }
    // On-demand __NEXT_DATA__ scan requested by content script
    if (event.data && event.data.type === 'BO_SCAN_NEXT_DATA') {
      scanNextData();
    }
  });
})();
