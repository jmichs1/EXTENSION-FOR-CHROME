// Break Odds Engine — MAIN world fetch interceptor
// Runs at document_start via manifest "world": "MAIN"
// Captures break IDs and break data from Whatnot's GraphQL API calls
(function() {
  if (window.__boNetIntercept) return;
  window.__boNetIntercept = true;
  window.__boQueue = [];
  var __boGqlUrl = null;
  var __boGqlHeaders = null;

  function post(msg) {
    window.postMessage(msg, '*');
    window.__boQueue.push(msg);
  }

  // Deep scan for arrays that look like spot options (have title + available fields)
  function findSpotOptions(obj, depth) {
    if (!obj || typeof obj !== 'object' || depth > 6) return null;
    if (Array.isArray(obj)) {
      if (obj.length > 2 && obj[0] && typeof obj[0].title === 'string' && typeof obj[0].available === 'boolean') {
        return obj;
      }
      for (var i = 0; i < obj.length; i++) {
        var found = findSpotOptions(obj[i], depth + 1);
        if (found) return found;
      }
      return null;
    }
    // Check paginated edges pattern: { edges: [{ node: {title, available} }] }
    if (obj.edges && Array.isArray(obj.edges) && obj.edges.length > 2) {
      var nodes = obj.edges.map(function(e) { return e.node; }).filter(Boolean);
      if (nodes.length > 2 && nodes[0].title && typeof nodes[0].available === 'boolean') {
        return nodes;
      }
    }
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        var found = findSpotOptions(obj[k], depth + 1);
        if (found) return found;
      }
    }
    return null;
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
      __boGqlUrl = url.split('?')[0];
      post({ type: 'BO_GQL_URL', payload: { url: __boGqlUrl } });
      // Capture request headers for replaying in active fetches
      try { if (args[1] && args[1].headers) { var hdr = {}; if (args[1].headers instanceof Headers) { args[1].headers.forEach(function(v,k){hdr[k]=v;}); } else { for (var hk in args[1].headers) hdr[hk]=args[1].headers[hk]; } __boGqlHeaders = hdr; } } catch(e2) {}
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
            breakId = body2?.variables?.id || body2?.variables?.breakId || null;
            var opName = body2?.operationName || '';
            console.log('[BO] GQL response: op=' + opName + ' keys=' + (json?.data ? Object.keys(json.data).join(',') : 'none'));
          } catch (e) {}
          if (json?.data?.getBreak) {
            breakId = breakId || json.data.getBreak.id;
            // If getBreak has no spotOptions, try to find them elsewhere in the response
            var breakData = json.data.getBreak;
            if (!breakData.spotOptions && !breakData.paginatedSpotOptions) {
              var foundSpots = findSpotOptions(json.data, 0);
              if (foundSpots && foundSpots.length > 2) {
                console.log('[BO] Found ' + foundSpots.length + ' spot options via deep scan');
                breakData = Object.assign({}, breakData, { spotOptions: foundSpots });
              }
            }
            post({ type: 'BO_API_DATA', payload: { breakData: breakData, breakId: breakId } });
          }
          // Also check for spot options data without getBreak (separate spot queries)
          if (!json?.data?.getBreak) {
            var spots = findSpotOptions(json?.data, 0);
            if (spots && spots.length > 2) {
              // Build a synthetic breakData from the spot options
              var synBreak = { spotOptions: spots, totalBreakSpots: spots.length };
              if (breakId) synBreak.id = breakId;
              console.log('[BO] Synthetic break from spot options: ' + spots.length + ' spots, breakId=' + breakId);
              post({ type: 'BO_API_DATA', payload: { breakData: synBreak, breakId: breakId } });
            }
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
    // Active GraphQL fetch delegated from content script (ISOLATED world)
    // Runs here in MAIN world to use the same auth context as Whatnot's frontend
    if (event.data && event.data.type === 'BO_FETCH_BREAK') {
      var bid = event.data.payload && event.data.payload.breakId;
      var gql = event.data.payload && event.data.payload.query;
      var fetchUrl = __boGqlUrl || '/graphql';
      if (bid && gql) {
        console.log('[BO] MAIN fetch for breakId=' + bid + ' url=' + fetchUrl + ' hasHeaders=' + !!__boGqlHeaders);
        var fhdr = {};
        if (__boGqlHeaders) { for (var fk in __boGqlHeaders) { if (fk.toLowerCase() !== 'content-length') fhdr[fk] = __boGqlHeaders[fk]; } }
        fhdr['Content-Type'] = 'application/json';
        origFetch(fetchUrl, {
          method: 'POST', headers: fhdr, credentials: 'include',
          body: JSON.stringify({ operationName: 'QueryBreak', query: gql, variables: { id: bid, getAllSpotOptions: true, getAllSpots: false, getPaginatedSpots: false, getPaginatedSpotOptions: false } })
        }).then(function(resp) {
          if (!resp.ok) { console.log('[BO] MAIN fetch HTTP ' + resp.status); return null; }
          return resp.json();
        }).then(function(json) {
          if (json && json.data && json.data.getBreak) {
            console.log('[BO] MAIN fetch got getBreak, spots=' + (json.data.getBreak.spotOptions ? json.data.getBreak.spotOptions.length : 0));
            post({ type: 'BO_API_DATA', payload: { breakData: json.data.getBreak, breakId: bid } });
          } else {
            console.log('[BO] MAIN fetch response has no getBreak data', json ? Object.keys(json) : 'null');
          }
        }).catch(function(e) { console.log('[BO] MAIN fetch error:', e.message); });
      } else {
        console.log('[BO] MAIN fetch skipped: bid=' + bid + ' gql=' + !!gql);
      }
    }
  });
})();
