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
        vPosition: ["24px", "24px"],
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
  }, []);

  return null;
}
