"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { showerProjects } from "@/data/portfolio";

const HERO_VIDEO_SRC = "/hero/gemini_generated_video_BA8DA8AD.MP4";
const posterImage = showerProjects[0];

export function HeroVideo() {
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);

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
      {/*
        Preload hint rendered into <head> by Next.js App Router.
        The browser starts fetching the video file at HTML parse time,
        before React hydrates — eliminating the load delay gap entirely.
      */}
      {!reduced && (
        <link
          rel="preload"
          as="video"
          href={HERO_VIDEO_SRC}
          type="video/mp4"
        />
      )}

      {/* Solid base — prevents transparent flash on very slow connections */}
      <div className="absolute inset-0 z-0 bg-[#1a2a35]" aria-hidden />

      {/*
        Fallback image — always rendered, priority loaded, sits at z-[1].
        Fades out once the video is producing frames (onPlaying fired).
        Stays visible indefinitely if the video errors out.
      */}
      <Image
        src={posterImage.image}
        alt={posterImage.alt}
        fill
        priority
        quality={95}
        sizes="100vw"
        className={`absolute inset-0 z-[1] h-full w-full object-cover object-center transition-opacity duration-700 ${
          videoStarted && !videoFailed ? "opacity-0" : "opacity-100"
        }`}
      />

      {/*
        Video sits at z-[2] and is rendered in the initial SSR HTML —
        no `mounted` guard so the browser can begin loading it immediately.
        Before any frames are decoded the video element is visually transparent,
        so the fallback image shows through naturally with zero flicker.
        The moment real pixels are produced (onPlaying), the image fades out.
      */}
      {!reduced && (
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
            preload="auto"
            onPlaying={handlePlaying}
            onError={handleError}
            aria-hidden
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
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
