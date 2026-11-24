"use client";

import { useEffect, useRef } from "react";

export function AnalyticsTracker() {
  const trackedRef = useRef(false);

  useEffect(() => {
    // Only track once per component mount / session load
    if (trackedRef.current) return;
    trackedRef.current = true;

    try {
      // Get or create persistent visitor ID
      let visitorId = localStorage.getItem("neuro_vid");
      if (!visitorId) {
        visitorId = `vid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem("neuro_vid", visitorId);
      }

      // Check session debounce to prevent spam on rapid refresh
      const lastTrack = sessionStorage.getItem("neuro_last_track");
      const now = Date.now();
      if (lastTrack && now - Number.parseInt(lastTrack, 10) < 5000) {
        return;
      }
      sessionStorage.setItem("neuro_last_track", String(now));

      const payload = {
        visitorId,
        path: window.location.pathname,
        referrer: document.referrer || "direct",
        language: navigator.language || "en",
      };

      // Non-blocking ping
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
        navigator.sendBeacon("/api/analytics/track", blob);
      } else {
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Ignore client tracking failures silently
    }
  }, []);

  return null;
}
