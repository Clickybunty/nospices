/* global fbq */
export const initializeTracking = (consent) => {
    if (consent.statistics) {
      console.log("Statistik-Tracking aktiviert.");
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "GA_TRACKING_ID"); // Ersetze GA_TRACKING_ID mit deiner Google Analytics ID
    }
  
    if (consent.marketing) {
      console.log("Marketing-Tracking aktiviert.");
      (function(f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      fbq("init", "YOUR_PIXEL_ID"); // Ersetze YOUR_PIXEL_ID mit deiner Pixel-ID
      fbq("track", "PageView");
    }
  };
  
  