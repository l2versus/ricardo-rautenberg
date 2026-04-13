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
    video.volume = 0;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };

    const handleUserInteraction = () => {
      tryPlay();
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("mousedown", handleUserInteraction);
    };

    window.addEventListener("touchstart", handleUserInteraction, { passive: true });
    window.addEventListener("mousedown", handleUserInteraction, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    video.addEventListener("loadedmetadata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    tryPlay();

    return () => {
      observer.disconnect();
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("mousedown", handleUserInteraction);
      video.removeEventListener("loadedmetadata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={resolveVideoSrc(src)}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      preload="auto"
      className={className}
      style={{ WebkitPlaysinline: true } as React.CSSProperties}
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
    />
  );
}