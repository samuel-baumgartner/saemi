"use client";

import React, { useEffect, useState } from "react";
import ModelViewer from "./ModelViewer";

interface CarouselItem {
  type: 'image' | 'video' | 'model';
  src: string;
}

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  images?: string[];
  carouselItems?: CarouselItem[];
  content?: React.ReactNode;
  headerContent?: React.ReactNode;
}

export default function EducationModal({
  isOpen,
  onClose,
  title,
  description,
  images,
  carouselItems,
  content,
  headerContent,
}: EducationModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Convert images array to carouselItems if provided
  const items: CarouselItem[] = carouselItems || (images ? images.map(img => ({ type: 'image' as const, src: img })) : []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset to first item when modal opens
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const goToPreviousImage = () => {
    if (items.length > 0) {
      setCurrentImageIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    }
  };

  const goToNextImage = () => {
    if (items.length > 0) {
      setCurrentImageIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }
  };
  
  const getYouTubeEmbedUrl = (url: string) => {
    // Extract video ID from various YouTube URL formats
    let videoId = '';
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (match) {
      videoId = match[1];
    }
    // Also check for start time parameter
    const startMatch = url.match(/[?&]t=(\d+)/);
    const startTime = startMatch ? startMatch[1] : '25';
    
    if (!videoId) return url;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&start=${startTime}&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-200/50 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto flex-1">
          {/* Header Content */}
          {headerContent && (
            <div className="p-10 pb-6 relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 w-10 h-10 flex items-center justify-center transition-all z-20"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="pr-12">{headerContent}</div>
            </div>
          )}
          
          {/* Image/Video Carousel */}
          {items.length > 0 && (
            <div className="relative w-full overflow-hidden bg-gradient-to-br from-white to-gray-50">
              <div className="relative w-full flex items-center" style={{ minHeight: '600px', maxHeight: '800px' }}>
                <div
                  className="flex transition-transform duration-500 ease-in-out w-full h-full"
                  style={{
                    transform: `translateX(-${currentImageIndex * 100}%)`,
                  }}
                >
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="min-w-full w-full h-full flex items-center justify-center p-10"
                    >
                      {item.type === 'image' ? (
                        <img
                          src={item.src}
                          alt={`${title} - Image ${index + 1}`}
                          className="max-h-[800px] max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl"
                          style={{ maxHeight: '800px' }}
                        />
                      ) : item.type === 'video' ? (
                        <div className="w-full max-w-4xl aspect-video rounded-xl shadow-2xl overflow-hidden">
                          <iframe
                            src={getYouTubeEmbedUrl(item.src)}
                            className="w-full h-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title={`${title} - Video ${index + 1}`}
                          />
                        </div>
                      ) : (
                        <div className="w-full max-w-4xl aspect-square rounded-xl shadow-2xl overflow-hidden bg-gray-100">
                          <ModelViewer modelPath={item.src} className="w-full h-full" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {items.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPreviousImage();
                    }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-xl transition-all z-10 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <svg
                      className="w-5 h-5 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNextImage();
                    }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-xl transition-all z-10 hover:scale-110"
                    aria-label="Next image"
                  >
                    <svg
                      className="w-5 h-5 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10 bg-gray-800/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    {items.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`transition-all rounded-full ${
                          index === currentImageIndex
                            ? "bg-gray-900 w-8 h-2"
                            : "bg-gray-600/60 hover:bg-gray-700/80 w-2 h-2"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Rest of Content */}
          {(content || title || description) && (
            <div className="p-10 pt-6 relative">
              {!headerContent && (
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 w-10 h-10 flex items-center justify-center transition-all z-20"
                  aria-label="Close"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
              {title && !content && (
                <div className="mb-6 pr-12">
                  <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
                </div>
              )}
              {content ? (
                <div className="text-gray-700 leading-relaxed pr-4">{content}</div>
              ) : (
                <p className="text-gray-700 leading-relaxed pr-4">{description}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

