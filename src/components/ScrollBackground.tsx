"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import frameNames from "@/data/ball-sequence.json";

const LOAD_CONCURRENCY = 4;

export default function ScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !context) return;
    const surface = canvas;
    const ctx = context;
    // Keep every decoded frame. Resolution bounds the whole sequence to about
    // 121 MiB on desktop or 54 MiB on mobile, rather than 791 MiB of source PNGs.
    const width = window.innerWidth <= 768 ? 640 : 960;
    surface.width = width;
    surface.height = width * 9 / 16;
    const frames: ImageBitmap[] = [];
    const abort = new AbortController();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let ready = false;
    let started = false;
    let animationEnd = 1;
    let displayedPosition = -1;
    let raf: number | undefined;

    function paint() {
      const progress = Math.max(0, Math.min(1, window.scrollY / animationEnd));
      const position = ready && !reducedMotion.matches ? progress * (frameNames.length - 1) : 0;
      if (!frames[0] || position === displayedPosition) return;
      const lower = Math.floor(position);
      const upper = Math.ceil(position);
      // Both draws complete in one animation callback. No clears, canvas
      // resizing, fetches, decoding, or spring/catch-up motion while scrolling.
      ctx.globalAlpha = 1;
      ctx.drawImage(frames[lower], 0, 0);
      if (upper !== lower) {
        ctx.globalAlpha = position - lower;
        ctx.drawImage(frames[upper], 0, 0);
      }
      ctx.globalAlpha = 1;
      displayedPosition = position;
      surface.style.visibility = "visible";
    }

    function scheduleUpdate() {
      if (disposed || raf !== undefined) return;
      raf = requestAnimationFrame(() => {
        raf = undefined;
        paint();
      });
    }

    async function loadFrame(index: number) {
      const response = await fetch(`/ball-sequence/${frameNames[index]}-${width}.webp`, {
        signal: abort.signal,
      });
      if (!response.ok) throw new Error(`Background frame: ${response.status}`);
      const bitmap = await createImageBitmap(await response.blob());
      if (disposed || abort.signal.aborted) {
        bitmap.close();
        return;
      }
      frames[index] = bitmap;
    }

    async function loadSequence() {
      if (started || disposed || reducedMotion.matches) return;
      started = true;
      let nextIndex = 1;
      try {
        await Promise.all(Array.from({ length: LOAD_CONCURRENCY }, async () => {
          while (!disposed && !abort.signal.aborted && nextIndex < frameNames.length) {
            await loadFrame(nextIndex++);
          }
        }));
        if (disposed || abort.signal.aborted) return;
        ready = true;
        scheduleUpdate();
      } catch {
        // A failed sequence stays on its poster, never a partial animation.
        abort.abort();
        for (let index = 1; index < frames.length; index++) frames[index]?.close();
        frames.length = 1;
      }
    }

    function onMotionChange() {
      scheduleUpdate();
      void loadSequence();
    }

    function updateAnimationEnd() {
      const projects = document.getElementById("projects");
      animationEnd = projects
        ? Math.max(1, projects.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.5)
        : Math.max(1, window.innerHeight);
      scheduleUpdate();
    }

    function restoreFrame() {
      displayedPosition = -1;
      scheduleUpdate();
    }

    const resizeObserver = new ResizeObserver(updateAnimationEnd);
    resizeObserver.observe(document.querySelector("main") || document.body);
    reducedMotion.addEventListener("change", onMotionChange);
    window.addEventListener("resize", updateAnimationEnd);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    surface.addEventListener("contextrestored", restoreFrame);
    updateAnimationEnd();
    void loadFrame(0).then(() => {
      scheduleUpdate();
      return loadSequence();
    }).catch(() => { /* Leave the static CSS poster visible if loading fails. */ });

    return () => {
      disposed = true;
      abort.abort();
      if (raf !== undefined) cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      reducedMotion.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", updateAnimationEnd);
      window.removeEventListener("scroll", scheduleUpdate);
      surface.removeEventListener("contextrestored", restoreFrame);
      for (const frame of frames) frame?.close();
    };
  }, []);

  return (
    <div className="scroll-background" aria-hidden="true">
      <Image className="scroll-background-poster" src="/ball-sequence/0001-960.webp"
        alt="" width={960} height={540} unoptimized />
      <canvas ref={canvasRef} width={960} height={540} style={{ visibility: "hidden" }} />
    </div>
  );
}
