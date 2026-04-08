"use client";

import { useRef, useEffect } from "react";

interface AutoplayVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

function resolveVideoSrc(src: string): string {
  if (src.startsWith("/images/") && src.endsWith(".mp4")) {
    const name = src.replace("/images/", "");
    return `/api/video/${name}`;
  }
  return src;
}

export function AutoplayVideo({ src, poster, className }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const tryPlay = () => {
      video.play().catch(() => {
        // Some browsers need user interaction, poster will show as fallback
      });
    };

    // Try immediately
    tryPlay();

    // Also try when video data is loaded
    video.addEventListener("loadeddata", tryPlay);
    // Try on visibility change (tab becomes active)
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) tryPlay();
    });

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      preload="auto"
      className={className}
    >
      <source src={resolveVideoSrc(src)} type="video/mp4" />
    </video>
  );
}
