"use client";

import { useState, useEffect, useRef } from "react";

const TOTAL_IMAGES = 120;

function getImagePath(index: number): string {
  const paddedIndex = String(index + 1).padStart(4, "0");
  return `/data/${paddedIndex}.png`;
}

export default function ScrollBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const rafRef = useRef<number>();
  const lastIndexRef = useRef(0);

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      for (let i = 0; i < TOTAL_IMAGES; i++) {
        const img = new Image();
        img.src = getImagePath(i);
        imagesRef.current.set(i, img);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.scrollY;
        const scrollProgress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
        const imageIndex = Math.floor(scrollProgress * (TOTAL_IMAGES - 1));
        
        if (imageIndex !== lastIndexRef.current) {
          // Only update if image is loaded or we'll wait for it
          const img = imagesRef.current.get(imageIndex);
          if (img && (img.complete || img.naturalWidth > 0)) {
            setCurrentImageIndex(imageIndex);
            lastIndexRef.current = imageIndex;
          } else {
            // If not loaded yet, set it anyway but it might flicker once
            setCurrentImageIndex(imageIndex);
            lastIndexRef.current = imageIndex;
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${getImagePath(currentImageIndex)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          imageRendering: "auto",
        }}
      />
      <div className="fixed inset-0 -z-10 bg-black/40" />
    </>
  );
}

