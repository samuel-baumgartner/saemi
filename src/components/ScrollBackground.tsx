"use client";

import { useEffect, useRef } from "react";

const TOTAL_IMAGES = 100;
const PRELOAD_RADIUS = 2;
const MAX_LOADS = 2;

function getImagePath(index: number): string {
  return `/data/${String(index + 1).padStart(4, "0")}.png`;
}

export default function ScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !context) return;

    // One persistent bitmap: never clear the displayed frame while another loads.
    // Its native resolution stays fixed, including during viewport resizing.
    context.globalCompositeOperation = "copy";
    const images = new Map<number, HTMLImageElement>();
    const loading = new Map<number, HTMLImageElement>();
    const failed = new Set<number>();
    let disposed = false;
    let requestedIndex = 0;
    let displayedIndex = -1;
    let animationEnd = 1;
    let raf: number | undefined;

    function desiredFrames() {
      const indices = [requestedIndex];
      for (let distance = 1; distance <= PRELOAD_RADIUS; distance++) {
        if (requestedIndex + distance < TOTAL_IMAGES) indices.push(requestedIndex + distance);
        if (requestedIndex - distance >= 0) indices.push(requestedIndex - distance);
      }
      return indices;
    }

    function paint() {
      const image = images.get(requestedIndex);
      if (!image || requestedIndex === displayedIndex) return;
      try {
        // Draw the actual decoded element, not a second CSS image resource.
        // Copy replaces transparent pixels too, without an intermediate blank frame.
        context!.drawImage(image, 0, 0, canvas!.width, canvas!.height);
        displayedIndex = requestedIndex;
      } catch {
        // Keep the last good pixels if a browser cannot draw this frame.
        images.delete(requestedIndex);
        failed.add(requestedIndex);
      }
    }

    function prepareFrames() {
      const wanted = desiredFrames();
      for (const index of images.keys()) {
        if (!wanted.includes(index)) images.delete(index);
      }
      for (const index of wanted) {
        if (loading.size >= MAX_LOADS) break;
        if (images.has(index) || loading.has(index) || failed.has(index)) continue;
        const image = new Image();
        loading.set(index, image);
        image.decoding = "async";
        image.src = getImagePath(index);
        void image.decode().then(() => {
          if (disposed) return;
          if (image.naturalWidth === 0 || image.naturalHeight === 0) throw new Error("Empty frame");
          // A late completion must never replace a newer scroll target.
          if (desiredFrames().includes(index)) images.set(index, image);
        }).catch(() => {
          if (!disposed) failed.add(index);
        }).finally(() => {
          loading.delete(index);
          if (!disposed) scheduleUpdate();
        });
      }
    }

    function scheduleUpdate() {
      if (disposed || raf !== undefined) return;
      raf = requestAnimationFrame(() => {
        raf = undefined;
        const progress = Math.max(0, Math.min(1, window.scrollY / animationEnd));
        requestedIndex = Math.floor(progress * (TOTAL_IMAGES - 1));
        paint();
        prepareFrames();
      });
    }

    function updateAnimationEnd() {
      const projects = document.getElementById("projects");
      animationEnd = projects
        ? Math.max(1, projects.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.5)
        : Math.max(1, window.innerHeight);
      scheduleUpdate();
    }

    const resizeObserver = new ResizeObserver(updateAnimationEnd);
    resizeObserver.observe(document.querySelector("main") || document.body);
    window.addEventListener("resize", updateAnimationEnd);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    canvas.addEventListener("contextrestored", restoreFrame);
    function restoreFrame() {
      context!.globalCompositeOperation = "copy";
      displayedIndex = -1;
      scheduleUpdate();
    }
    updateAnimationEnd();

    return () => {
      disposed = true;
      if (raf !== undefined) cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateAnimationEnd);
      window.removeEventListener("scroll", scheduleUpdate);
      canvas.removeEventListener("contextrestored", restoreFrame);
      for (const image of loading.values()) image.src = "";
      loading.clear();
      images.clear();
    };
  }, []);

  return (
    <div className="scroll-background" aria-hidden="true">
      <canvas ref={canvasRef} width={1920} height={1080} />
    </div>
  );
}
