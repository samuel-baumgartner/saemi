"use client";

import { useState, useEffect, useRef } from "react";

const TOTAL_IMAGES = 100;
// Adjust this number to control how fast images progress: higher = faster (more images per pixel scrolled)
const SCROLL_MULTIPLIER = 0.039;


function getImagePath(index: number): string {
  const paddedIndex = String(index + 1).padStart(4, "0");
  return `/data/${paddedIndex}.png`;
}

export default function ScrollBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadedImagesRef = useRef<Set<number>>(new Set());
  const rafRef = useRef<number | undefined>(undefined);
  const lastIndexRef = useRef(0);

  // Prioritize loading the first image immediately
  useEffect(() => {
    const loadFirstImage = () => {
      const img = new Image();
      img.onload = () => {
        loadedImagesRef.current.add(0);
        imagesRef.current.set(0, img);
        setIsFirstImageLoaded(true);
      };
      img.onerror = () => {
        loadedImagesRef.current.add(0);
        setIsFirstImageLoaded(true);
      };
      img.src = getImagePath(0);
      imagesRef.current.set(0, img);
    };

    loadFirstImage();
  }, []);

  // Preload remaining images after first image is loaded
  useEffect(() => {
    if (!isFirstImageLoaded) return;

    const preloadImages = () => {
      // Preload first few images immediately
      for (let i = 1; i <= 10; i++) {
        const img = new Image();
        img.onload = () => {
          loadedImagesRef.current.add(i);
        };
        img.onerror = () => {
          loadedImagesRef.current.add(i);
        };
        img.src = getImagePath(i);
        imagesRef.current.set(i, img);
      }

      // Preload remaining images in batches to avoid blocking
      let batchStart = 11;
      const preloadBatch = () => {
        const batchEnd = Math.min(batchStart + 10, TOTAL_IMAGES);
        for (let i = batchStart; i < batchEnd; i++) {
          const img = new Image();
          img.onload = () => {
            loadedImagesRef.current.add(i);
          };
          img.onerror = () => {
            loadedImagesRef.current.add(i);
          };
          img.src = getImagePath(i);
          imagesRef.current.set(i, img);
        }
        batchStart = batchEnd;
        if (batchStart < TOTAL_IMAGES) {
          setTimeout(preloadBatch, 50);
        }
      };
      setTimeout(preloadBatch, 100);
    };

    preloadImages();
  }, [isFirstImageLoaded]);

  // Preload adjacent images when scrolling
  useEffect(() => {
    const preloadAdjacent = (index: number) => {
      const preloadRange = 5;
      for (let i = Math.max(0, index - preloadRange); i <= Math.min(TOTAL_IMAGES - 1, index + preloadRange); i++) {
        if (!loadedImagesRef.current.has(i)) {
          const img = imagesRef.current.get(i);
          if (img && !img.complete) {
            img.src = getImagePath(i);
          }
        }
      }
    };

    if (currentImageIndex !== undefined) {
      preloadAdjacent(currentImageIndex);
    }
  }, [currentImageIndex]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        // Simple calculation: scrollTop * multiplier determines image index
        const imageIndex = Math.min(Math.floor(scrollTop * SCROLL_MULTIPLIER), TOTAL_IMAGES - 1);
        
        if (imageIndex !== lastIndexRef.current) {
          const img = imagesRef.current.get(imageIndex);
          
          // Only update if image is confirmed loaded to prevent flickering
          if (img && (img.complete || loadedImagesRef.current.has(imageIndex))) {
            setCurrentImageIndex(imageIndex);
            lastIndexRef.current = imageIndex;
          }
          // If not loaded, don't switch yet - will switch once loaded via onload handler
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

  // Don't render background until first image is loaded
  if (!isFirstImageLoaded) {
    return (
      <div className="fixed inset-0 -z-10 bg-black" />
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 -z-10 transition-opacity duration-300"
        style={{
          backgroundImage: `url(${getImagePath(currentImageIndex)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          imageRendering: "auto",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          willChange: "background-image",
          opacity: isFirstImageLoaded ? 1 : 0,
        }}
      />
      <div className="fixed inset-0 -z-10 bg-black/40" />
    </>
  );
}

