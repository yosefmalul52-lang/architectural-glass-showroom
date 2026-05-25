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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || reduced) {
      setShowVideo(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const onError = () => setShowVideo(false);

    const play = async () => {
      try {
        await video.play();
        setShowVideo(true);
      } catch {
        setShowVideo(false);
      }
    };

    play();
    video.addEventListener("error", onError);
    return () => video.removeEventListener("error", onError);
  }, [mounted, reduced]);

  const showFallback = !mounted || !showVideo;

  return (
    <>
      <Image
        src={posterImage.image}
        alt={posterImage.alt}
        fill
        priority
        sizes="100vw"
        className={`object-cover transition-opacity duration-700 ${
          showFallback ? "opacity-100" : "opacity-0"
        }`}
      />
      {mounted && !reduced && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            showVideo ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterImage.image}
          aria-hidden
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </>
  );
}
