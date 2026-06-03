"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    interdeal?: {
      sitekey: string;
      domains: { js: string; acc: string };
      Position: string;
      Menulang: string;
      draggable: boolean;
      btnStyle: Record<string, unknown>;
    };
  }
}

const SCRIPT_ID = "equalweb-accessibility-core";

/**
 * Loads EqualWeb accessibility widget (vendor snippet).
 * @see https://login.equalweb.com/custom-button
 */
export function EqualWebAccessibility() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;

    window.interdeal = {
      get sitekey() {
        return "1a074782db11fdaed7bc620063f4185f";
      },
      get domains() {
        return {
          js: "https://cdn.equalweb.com/",
          acc: "https://access.equalweb.com/",
        };
      },
      Position: "right",
      Menulang: "HE",
      draggable: true,
      btnStyle: {
        // EqualWeb: % > 50 anchors from bottom (100% = flush bottom)
        vPosition: ["100%", "100%"],
        margin: ["12px", "12px"],
        scale: ["0.65", "0.65"],
        color: {
          main: "#2d6b84",
          second: "#ffffff",
        },
        icon: {
          outline: false,
          outlineColor: "#ffffff",
          type: 13,
          shape: "circle",
        },
      },
    };

    const coreCall = document.createElement("script");
    coreCall.id = SCRIPT_ID;
    coreCall.src = `${window.interdeal.domains.js}core/5.2.8/accessibility.js`;
    coreCall.defer = true;
    coreCall.integrity =
      "sha512-ka0NgF7zDksnhoZ5ZCKlm+t0F7KTih5lCfXwuzQDnrwu/EdKZSsJotoJvQPd0cuVmV63s0q2cgoUjeki688PuQ==";
    coreCall.crossOrigin = "anonymous";
    coreCall.setAttribute("data-cfasync", "true");
    document.body.appendChild(coreCall);

    const pinBottomRight = () => {
      const btn = document.getElementById("INDmenu-btn");
      const wrap = document.getElementById("INDbtnWrap");
      for (const el of [btn, wrap]) {
        if (!el) continue;
        el.style.setProperty("position", "fixed", "important");
        el.style.setProperty("top", "auto", "important");
        el.style.setProperty(
          "bottom",
          "max(1rem, env(safe-area-inset-bottom))",
          "important"
        );
        el.style.setProperty(
          "right",
          "max(1rem, env(safe-area-inset-right))",
          "important"
        );
        el.style.setProperty("left", "auto", "important");
      }
    };

    const observer = new MutationObserver(() => {
      if (document.getElementById("INDmenu-btn")) {
        pinBottomRight();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
