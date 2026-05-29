"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { showerProjects } from "@/data/portfolio";

const HERO_VIDEO_SRC = "/hero/tzameret-hero.mp4";
const posterImage = showerProjects[0];

/** Returns true if we should skip video (save-data or very slow connection). */
function shouldSkipVideo(): boolean {
  if (typeof window === "undefined") return true;
  // Skip only on save-data or very slow connections
  const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
  const conn = nav.connection;
  if (conn?.saveData) return true;
  if (conn?.effectiveType && ["slow-2g", "2g"].includes(conn.effectiveType)) return true;
  return false;
}

export function HeroVideo() {
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Decide after hydration whether to load the video
    if (!reduced && !shouldSkipVideo()) {
      setShowVideo(true);
    }
  }, [reduced]);

  function handlePlaying() {
    setVideoStarted(true);
  }

  function handleError() {
    setVideoFailed(true);
  }

  function toggleVideoPause() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setVideoPaused(false);
    } else {
      video.pause();
      setVideoPaused(true);
    }
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Solid base — prevents transparent flash on very slow connections */}
      <div className="absolute inset-0 z-0 bg-[#1a2a35]" aria-hidden />

      {/* Fallback/poster image — always rendered, priority loaded */}
      <Image
        src={posterImage.image}
        alt={posterImage.alt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className={`absolute inset-0 z-[1] h-full w-full object-cover object-center transition-opacity duration-700 ${
          videoStarted && !videoFailed ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video — only on desktop with good connection */}
      {showVideo && (
        <>
          <video
            ref={videoRef}
            className={`absolute inset-0 z-[2] h-full w-full object-cover object-center transition-opacity duration-700 ${
              videoFailed ? "opacity-0" : "opacity-100"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            onPlaying={handlePlaying}
            onError={handleError}
            aria-hidden
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4; codecs=avc1.42E01E, mp4a.40.2" />
          </video>

          {videoStarted && (
            <button
              type="button"
              onClick={toggleVideoPause}
              className="sr-only focus:not-sr-only focus:absolute focus:end-4 focus:top-4 focus:z-20 focus:rounded-sm focus:border focus:border-white/30 focus:bg-text-main/80 focus:px-3 focus:py-2 focus:text-xs focus:text-white"
              aria-label={videoPaused ? "הפעלת סרטון רקע" : "השהיית סרטון רקע"}
            >
              {videoPaused ? "הפעל סרטון" : "השהה סרטון"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
