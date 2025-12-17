"use client";

import { useState, useEffect, useRef } from "react";

const TOTAL_IMAGES = 100;

// ============================================
// SCROLL SPEED CONTROLS - Adjust these values
// ============================================
// Higher value = faster scrolling (more images per pixel scrolled)
// Lower value = slower scrolling (fewer images per pixel scrolled)
const SCROLL_MULTIPLIER_DESKTOP = 0.039;  // Desktop scroll speed
const SCROLL_MULTIPLIER_MOBILE = 0.025;   // Mobile scroll speed
// ============================================

function getPreloadRange(isMobile: boolean) {
  // Increase preload range for mobile to prevent flickering
  return isMobile ? 10 : 5;
}


function getImagePath(index: number): string {
  const paddedIndex = String(index + 1).padStart(4, "0");
  return `/data/${paddedIndex}.png`;
}

export default function ScrollBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(0);
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadedImagesRef = useRef<Set<number>>(new Set());
  const decodedImagesRef = useRef<Set<number>>(new Set());
  const rafRef = useRef<number | undefined>(undefined);
  const lastIndexRef = useRef(0);
  const pendingIndexRef = useRef<number | null>(null);
  const isUpdatingRef = useRef(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Helper to check if image is fully ready
  const isImageReady = (index: number): boolean => {
    const img = imagesRef.current.get(index);
    if (!img) return false;
    
    // Check if image is loaded
    if (!img.complete || img.naturalWidth === 0) return false;
    
    // If already decoded, it's ready
    if (decodedImagesRef.current.has(index)) return true;
    
    // If decode is supported but not yet decoded, start decoding
    if ('decode' in img) {
      img.decode()
        .then(() => {
          decodedImagesRef.current.add(index);
        })
        .catch(() => {
          // If decode fails, mark as decoded anyway if complete
          decodedImagesRef.current.add(index);
        });
      return false; // Not ready yet, decoding in progress
    }
    
    // No decode support, but image is complete - mark as decoded and ready
    decodedImagesRef.current.add(index);
    return true;
  };

  // Prioritize loading the first image immediately
  useEffect(() => {
    const loadFirstImage = () => {
      const img = new Image();
      img.onload = () => {
        loadedImagesRef.current.add(0);
        imagesRef.current.set(0, img);
        // Try to decode the image
        if ('decode' in img) {
          img.decode()
            .then(() => {
              decodedImagesRef.current.add(0);
              setIsFirstImageLoaded(true);
              setNextImageIndex(0);
            })
            .catch(() => {
              // If decode fails, still mark as loaded
              decodedImagesRef.current.add(0);
              setIsFirstImageLoaded(true);
              setNextImageIndex(0);
            });
        } else {
          decodedImagesRef.current.add(0);
          setIsFirstImageLoaded(true);
          setNextImageIndex(0);
        }
      };
      img.onerror = () => {
        loadedImagesRef.current.add(0);
        decodedImagesRef.current.add(0);
        setIsFirstImageLoaded(true);
        setNextImageIndex(0);
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
      // Preload more images on mobile to prevent flickering
      const initialPreload = typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 10;
      
      for (let i = 1; i <= initialPreload; i++) {
        const img = new Image();
        img.onload = () => {
          loadedImagesRef.current.add(i);
          // Decode early-preloaded frames too (helps avoid first-load flicker)
          if ('decode' in img) {
            img.decode()
              .then(() => {
                decodedImagesRef.current.add(i);
              })
              .catch(() => {
                decodedImagesRef.current.add(i);
              });
          } else {
            decodedImagesRef.current.add(i);
          }
        };
        img.onerror = () => {
          loadedImagesRef.current.add(i);
          decodedImagesRef.current.add(i);
        };
        img.src = getImagePath(i);
        imagesRef.current.set(i, img);
      }

      // Preload remaining images in batches to avoid blocking
      let batchStart = initialPreload + 1;
      const preloadBatch = () => {
        const batchSize = typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 10;
        const batchEnd = Math.min(batchStart + batchSize, TOTAL_IMAGES);
        for (let i = batchStart; i < batchEnd; i++) {
            const img = new Image();
            img.onload = () => {
              loadedImagesRef.current.add(i);
              // Try to decode
              if ('decode' in img) {
                img.decode()
                  .then(() => {
                    decodedImagesRef.current.add(i);
                    // If this was a pending image, update now
                    if (pendingIndexRef.current === i && !isUpdatingRef.current) {
                      isUpdatingRef.current = true;
                      if (isMobile) {
                        setNextImageIndex(i);
                        requestAnimationFrame(() => {
                          setCurrentImageIndex(i);
                          lastIndexRef.current = i;
                          pendingIndexRef.current = null;
                          isUpdatingRef.current = false;
                        });
                      } else {
                        setCurrentImageIndex(i);
                        setNextImageIndex(i);
                        lastIndexRef.current = i;
                        pendingIndexRef.current = null;
                        isUpdatingRef.current = false;
                      }
                    }
                  })
                  .catch(() => {
                    decodedImagesRef.current.add(i);
                  });
              } else {
                decodedImagesRef.current.add(i);
                // If this was a pending image, update now
                if (pendingIndexRef.current === i && !isUpdatingRef.current) {
                  isUpdatingRef.current = true;
                  if (isMobile) {
                    setNextImageIndex(i);
                    requestAnimationFrame(() => {
                      setCurrentImageIndex(i);
                      lastIndexRef.current = i;
                      pendingIndexRef.current = null;
                      isUpdatingRef.current = false;
                    });
                  } else {
                    setCurrentImageIndex(i);
                    setNextImageIndex(i);
                    lastIndexRef.current = i;
                    pendingIndexRef.current = null;
                    isUpdatingRef.current = false;
                  }
                }
              }
            };
            img.onerror = () => {
              loadedImagesRef.current.add(i);
              decodedImagesRef.current.add(i);
            };
          img.src = getImagePath(i);
          imagesRef.current.set(i, img);
        }
        batchStart = batchEnd;
        if (batchStart < TOTAL_IMAGES) {
          setTimeout(preloadBatch, 30);
        }
      };
      setTimeout(preloadBatch, 50);
    };

    preloadImages();
  }, [isFirstImageLoaded]);

  // Preload adjacent images when scrolling
  useEffect(() => {
    const preloadAdjacent = (index: number) => {
      const preloadRange = getPreloadRange(isMobile);
      for (let i = Math.max(0, index - preloadRange); i <= Math.min(TOTAL_IMAGES - 1, index + preloadRange); i++) {
        if (!loadedImagesRef.current.has(i)) {
          if (!imagesRef.current.has(i)) {
            const img = new Image();
            img.onload = () => {
              loadedImagesRef.current.add(i);
              // Try to decode
              if ('decode' in img) {
                img.decode()
                  .then(() => {
                    decodedImagesRef.current.add(i);
                    // If this was a pending image, update now
                    if (pendingIndexRef.current === i && !isUpdatingRef.current) {
                      isUpdatingRef.current = true;
                      if (isMobile) {
                        setNextImageIndex(i);
                        requestAnimationFrame(() => {
                          setCurrentImageIndex(i);
                          lastIndexRef.current = i;
                          pendingIndexRef.current = null;
                          isUpdatingRef.current = false;
                        });
                      } else {
                        setCurrentImageIndex(i);
                        setNextImageIndex(i);
                        lastIndexRef.current = i;
                        pendingIndexRef.current = null;
                        isUpdatingRef.current = false;
                      }
                    }
                  })
                  .catch(() => {
                    decodedImagesRef.current.add(i);
                  });
              } else {
                decodedImagesRef.current.add(i);
                // If this was a pending image, update now
                if (pendingIndexRef.current === i && !isUpdatingRef.current) {
                  isUpdatingRef.current = true;
                  if (isMobile) {
                    setNextImageIndex(i);
                    requestAnimationFrame(() => {
                      setCurrentImageIndex(i);
                      lastIndexRef.current = i;
                      pendingIndexRef.current = null;
                      isUpdatingRef.current = false;
                    });
                  } else {
                    setCurrentImageIndex(i);
                    setNextImageIndex(i);
                    lastIndexRef.current = i;
                    pendingIndexRef.current = null;
                    isUpdatingRef.current = false;
                  }
                }
              }
            };
            img.onerror = () => {
              loadedImagesRef.current.add(i);
              decodedImagesRef.current.add(i);
            };
            img.src = getImagePath(i);
            imagesRef.current.set(i, img);
          }
        }
      }
    };

    if (currentImageIndex !== undefined) {
      preloadAdjacent(currentImageIndex);
    }
  }, [currentImageIndex, isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        // Use different multiplier for desktop vs mobile
        const scrollMultiplier = isMobile ? SCROLL_MULTIPLIER_MOBILE : SCROLL_MULTIPLIER_DESKTOP;
        // Simple calculation: scrollTop * multiplier determines image index
        const imageIndex = Math.min(Math.floor(scrollTop * scrollMultiplier), TOTAL_IMAGES - 1);
        
        if (imageIndex !== lastIndexRef.current && !isUpdatingRef.current) {
          // Check if image is fully ready (loaded and decoded)
          if (isImageReady(imageIndex)) {
            isUpdatingRef.current = true;
            
            // On desktop, update both immediately for instant switch (no transition flicker)
            // On mobile, use double buffering for smoother transitions
            if (isMobile) {
              // Mobile: use double buffering with transition
              if (nextImageIndex !== imageIndex) {
                setNextImageIndex(imageIndex);
              }
              requestAnimationFrame(() => {
                setCurrentImageIndex(imageIndex);
                lastIndexRef.current = imageIndex;
                pendingIndexRef.current = null;
                isUpdatingRef.current = false;
              });
            } else {
              // Desktop: instant switch, no transition to prevent flicker
              setNextImageIndex(imageIndex);
              setCurrentImageIndex(imageIndex);
              lastIndexRef.current = imageIndex;
              pendingIndexRef.current = null;
              isUpdatingRef.current = false;
            }
          } else {
            // Mark as pending and start loading
            if (pendingIndexRef.current !== imageIndex) {
              pendingIndexRef.current = imageIndex;
              
              if (!imagesRef.current.has(imageIndex)) {
                const newImg = new Image();
                newImg.onload = () => {
                  loadedImagesRef.current.add(imageIndex);
                  // Try to decode the image
                  if ('decode' in newImg) {
                    newImg.decode()
                      .then(() => {
                        decodedImagesRef.current.add(imageIndex);
                        if (pendingIndexRef.current === imageIndex && !isUpdatingRef.current) {
                          isUpdatingRef.current = true;
                          if (isMobile) {
                            setNextImageIndex(imageIndex);
                            requestAnimationFrame(() => {
                              setCurrentImageIndex(imageIndex);
                              lastIndexRef.current = imageIndex;
                              pendingIndexRef.current = null;
                              isUpdatingRef.current = false;
                            });
                          } else {
                            setNextImageIndex(imageIndex);
                            setCurrentImageIndex(imageIndex);
                            lastIndexRef.current = imageIndex;
                            pendingIndexRef.current = null;
                            isUpdatingRef.current = false;
                          }
                        }
                      })
                      .catch(() => {
                        // If decode fails, still mark as decoded and update
                        decodedImagesRef.current.add(imageIndex);
                        if (pendingIndexRef.current === imageIndex && !isUpdatingRef.current) {
                          isUpdatingRef.current = true;
                          if (isMobile) {
                            setNextImageIndex(imageIndex);
                            requestAnimationFrame(() => {
                              setCurrentImageIndex(imageIndex);
                              lastIndexRef.current = imageIndex;
                              pendingIndexRef.current = null;
                              isUpdatingRef.current = false;
                            });
                          } else {
                            setNextImageIndex(imageIndex);
                            setCurrentImageIndex(imageIndex);
                            lastIndexRef.current = imageIndex;
                            pendingIndexRef.current = null;
                            isUpdatingRef.current = false;
                          }
                        }
                      });
                  } else {
                    // No decode support, mark as decoded anyway
                    decodedImagesRef.current.add(imageIndex);
                    if (pendingIndexRef.current === imageIndex && !isUpdatingRef.current) {
                      isUpdatingRef.current = true;
                      if (isMobile) {
                        setNextImageIndex(imageIndex);
                        requestAnimationFrame(() => {
                          setCurrentImageIndex(imageIndex);
                          lastIndexRef.current = imageIndex;
                          pendingIndexRef.current = null;
                          isUpdatingRef.current = false;
                        });
                      } else {
                        setNextImageIndex(imageIndex);
                        setCurrentImageIndex(imageIndex);
                        lastIndexRef.current = imageIndex;
                        pendingIndexRef.current = null;
                        isUpdatingRef.current = false;
                      }
                    }
                  }
                };
                newImg.onerror = () => {
                  loadedImagesRef.current.add(imageIndex);
                  decodedImagesRef.current.add(imageIndex);
                };
                newImg.src = getImagePath(imageIndex);
                imagesRef.current.set(imageIndex, newImg);
              } else {
                // Image exists but not ready, wait for it to load
                const existingImg = imagesRef.current.get(imageIndex);
                if (existingImg && existingImg.complete && 'decode' in existingImg) {
                  existingImg.decode()
                    .then(() => {
                      decodedImagesRef.current.add(imageIndex);
                      if (pendingIndexRef.current === imageIndex && !isUpdatingRef.current) {
                        isUpdatingRef.current = true;
                        if (isMobile) {
                          setNextImageIndex(imageIndex);
                          requestAnimationFrame(() => {
                            setCurrentImageIndex(imageIndex);
                            lastIndexRef.current = imageIndex;
                            pendingIndexRef.current = null;
                            isUpdatingRef.current = false;
                          });
                        } else {
                          setNextImageIndex(imageIndex);
                          setCurrentImageIndex(imageIndex);
                          lastIndexRef.current = imageIndex;
                          pendingIndexRef.current = null;
                          isUpdatingRef.current = false;
                        }
                      }
                    })
                    .catch(() => {
                      decodedImagesRef.current.add(imageIndex);
                    });
                }
              }
            }
          }
        }
      });
    };

    // Use passive listener for better mobile performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Also listen to touchmove for mobile momentum scrolling
    window.addEventListener("touchmove", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile]);

  // Don't render background until first image is loaded
  if (!isFirstImageLoaded) {
    return (
      <div className="fixed inset-0 -z-10 bg-black" />
    );
  }

  // Use double buffering: always render both layers, fade between them
  const showNext = nextImageIndex !== currentImageIndex;

  return (
    <>
      {/* Black background layer */}
      <div className="fixed inset-0 -z-10 bg-black" />
      
      {/* Current image layer */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${getImagePath(currentImageIndex)})`,
          backgroundSize: isMobile ? "130%" : "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          imageRendering: "auto",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
          msTransform: "translateZ(0)",
          opacity: 1,
          transition: "none",
        }}
      />
      {/* Next image layer (double buffering for mobile transitions, hidden preload for desktop) */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${getImagePath(nextImageIndex)})`,
          backgroundSize: isMobile ? "130%" : "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          imageRendering: "auto",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
          msTransform: "translateZ(0)",
          opacity: isMobile && showNext ? 1 : 0,
          transition: isMobile && showNext ? "opacity 0.15s ease-in-out" : "none",
          willChange: isMobile && showNext ? "opacity" : "auto",
          pointerEvents: "none",
        }}
      />
      <div className="fixed inset-0 -z-10 bg-black/40" />
    </>
  );
}

