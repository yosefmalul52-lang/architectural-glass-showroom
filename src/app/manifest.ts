import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "צמרת הזכוכית — תכנון, הנדסה וביצוע",
    short_name: "צמרת הזכוכית",
    description:
      "תכנון וביצוע פרויקטי זכוכית אדריכלית בתקן EN12150 — מקלחונים, מחיצות, מראות וחזיתות.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5ede3",
    theme_color: "#2d6b84",
    lang: "he",
    dir: "rtl",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
