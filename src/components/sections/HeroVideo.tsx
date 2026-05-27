"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { showerProjects } from "@/data/portfolio";

const HERO_VIDEO_SRC = "/hero/gemini_generated_video_BA8DA8AD.mp4";
const posterImage = showerProjects[0];

export function HeroVideo() {
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || reduced) {
      setShowVideo(false);
      setVideoReady(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const onError = () => {
      setShowVideo(false);
      setVideoReady(false);
    };

    const onCanPlay = () => setVideoReady(true);

    const startPlayback = async () => {
      try {
        await video.play();
        setShowVideo(true);
        setVideoPaused(false);
      } catch {
        setShowVideo(false);
      }
    };

    const loadAndPlay = () => {
      if (video.getAttribute("data-loaded") === "true") {
        startPlayback();
        return;
      }
      video.setAttribute("data-loaded", "true");
      video.preload = "auto";
      video.load();
      video.addEventListener("canplay", startPlayback, { once: true });
    };

    const useIdle = typeof requestIdleCallback !== "undefined";
    const scheduleId = useIdle
      ? requestIdleCallback(loadAndPlay, { timeout: 2500 })
      : window.setTimeout(loadAndPlay, 1200);

    video.addEventListener("error", onError);
    video.addEventListener("canplay", onCanPlay);

    return () => {
      if (useIdle) cancelIdleCallback(scheduleId as number);
      else clearTimeout(scheduleId);
      video.removeEventListener("error", onError);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("canplay", startPlayback);
    };
  }, [mounted, reduced]);

  const showFallback = !mounted || !showVideo;

  function toggleVideoPause() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setVideoPaused(false);
      setShowVideo(true);
    } else {
      video.pause();
      setVideoPaused(true);
    }
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Image
        src={posterImage.image}
        alt={posterImage.alt}
        fill
        priority
        quality={95}
        sizes="100vw"
        className={`absolute inset-0 z-0 h-full w-full scale-[1.03] object-cover transition-opacity duration-700 ${
          showFallback ? "opacity-100" : "opacity-0"
        }`}
      />
      {mounted && !reduced && (
        <>
          <video
            ref={videoRef}
            className={`absolute inset-0 z-0 h-full w-full scale-[1.03] object-cover transition-opacity duration-700 ${
              showVideo ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={posterImage.image}
            aria-hidden
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
          {videoReady && (
            <button
              type="button"
              onClick={toggleVideoPause}
              className="sr-only focus:not-sr-only focus:absolute focus:end-4 focus:top-4 focus:z-20 focus:rounded-sm focus:border focus:border-white/30 focus:bg-text-main/80 focus:px-3 focus:py-2 focus:text-xs focus:text-white"
              aria-label={
                videoPaused ? "הפעלת סרטון רקע" : "השהיית סרטון רקע"
              }
            >
              {videoPaused ? "הפעל סרטון" : "השהה סרטון"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
