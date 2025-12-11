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
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      // Reset to first item when modal opens
      setCurrentImageIndex(0);
      
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-2 sm:p-4"
      onClick={onClose}
      style={{ overflow: 'hidden', overflowX: 'hidden' }}
    >
      <div
        className="bg-white rounded-2xl sm:rounded-3xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200/60 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ overflowX: 'hidden' }}
      >
        <div className="overflow-y-auto bg-white" style={{ maxHeight: '95vh', overflowX: 'hidden' }}>
          {/* Header Content */}
          {headerContent && (
            <div className="p-4 sm:p-6 md:p-10 pb-4 sm:pb-6 pl-4 sm:pl-8 md:pl-16 lg:pl-20 relative bg-white border-b border-gray-200/60">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-6 sm:right-6 text-gray-500 hover:text-gray-700 hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 rounded-full p-1.5 sm:p-2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all z-20 shadow-md hover:shadow-lg border border-gray-200/50 hover:border-red-200/50"
                aria-label="Close"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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
              <div className="pr-8 sm:pr-12">{headerContent}</div>
            </div>
          )}
          
          {/* Image/Video Carousel */}
          {items.length > 0 && (
            <div className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50/40 via-white to-purple-50/30 border-y border-blue-100/30">
              <div className="relative w-full flex items-center" style={{ minHeight: '300px' }}>
                <div
                  className="flex transition-transform duration-500 ease-in-out w-full"
                  style={{
                    transform: `translateX(-${currentImageIndex * 100}%)`,
                  }}
                >
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="min-w-full w-full flex items-center justify-center p-4 sm:p-6 md:p-4 lg:p-6"
                    >
                      {item.type === 'image' ? (
                        <img
                          src={item.src}
                          alt={`${title} - Image ${index + 1}`}
                          className="max-h-[400px] sm:max-h-[600px] md:max-h-[800px] max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl"
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
                        <div className="w-full max-w-6xl md:max-w-7xl lg:max-w-[90vw] flex flex-col items-center gap-3 sm:gap-4 py-2">
                          <div className="text-center space-y-2 sm:space-y-3 w-full px-2">
                            <h5 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-1 sm:mb-2 text-center">
                              {title || "3D Model"}
                            </h5>
                          </div>
                          <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl aspect-square rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 border border-gray-200/60 ring-2 sm:ring-4 ring-gray-100/50">
                            <ModelViewer modelPath={item.src} className="w-full h-full" />
                          </div>
                          <div className="w-full flex items-center justify-center pt-1 pb-2">
                            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-semibold px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm">
                              <span className="flex items-center justify-center gap-2 mx-auto">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span>Drag to rotate</span>
                              </span>
                            </p>
                          </div>
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
                    className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-xl transition-all z-10 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900"
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
                    className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-xl transition-all z-10 hover:scale-110"
                    aria-label="Next image"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900"
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
                  <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-2.5 z-10 bg-gray-800/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                    {items.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`transition-all rounded-full ${
                          index === currentImageIndex
                            ? "bg-gray-900 w-6 sm:w-8 h-1.5 sm:h-2"
                            : "bg-gray-600/60 hover:bg-gray-700/80 w-1.5 sm:w-2 h-1.5 sm:h-2"
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
            <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-6 sm:py-8 relative bg-white">
              {!headerContent && (
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 sm:top-6 sm:right-6 text-gray-500 hover:text-gray-700 hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 rounded-full p-1.5 sm:p-2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all z-20 shadow-md hover:shadow-lg border border-gray-200/50 hover:border-red-200/50"
                  aria-label="Close"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
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
                <div className="mb-4 sm:mb-6 pr-8 sm:pr-12">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">{title}</h3>
                </div>
              )}
              {content ? (
                <div className="text-sm sm:text-base text-gray-700 leading-relaxed pr-2 sm:pr-4 [&>*]:space-y-4 sm:[&>*]:space-y-6">{content}</div>
              ) : (
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed pr-2 sm:pr-4">{description}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

