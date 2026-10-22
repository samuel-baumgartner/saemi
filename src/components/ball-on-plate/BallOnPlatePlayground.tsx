"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Box, RotateCcw } from "lucide-react";

const Scene = dynamic(() => import("./BallOnPlatePlaygroundScene"), { ssr: false });

class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const MAX_RAD = (10 * Math.PI) / 180;

export default function BallOnPlatePlayground() {
  const host = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [status, setStatus] = useState("Move the mouse over the machine. Tilt it and watch the ball move freely.");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (host.current) observer.observe(host.current);
    return () => observer.disconnect();
  }, []);

  const applyPointer = (clientX: number, clientY: number) => {
    const el = stage.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    // Normalize to [-1, 1] from stage center.
    const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((clientY - rect.top) / rect.height) * 2 - 1;
    const clampedX = Math.max(-1, Math.min(1, nx));
    const clampedY = Math.max(-1, Math.min(1, ny));
    // Mouse right → roll (tiltY); mouse down → pitch (tiltX).
    setTiltY(clampedX * MAX_RAD);
    setTiltX(clampedY * MAX_RAD);
  };

  return (
    <section className="bop-viewer bop-playground" aria-label="Test the plate yourself" ref={host}>
      <div
        className="bop-stage bop-stage-interactive"
        ref={stage}
        onPointerEnter={(e) => {
          if (!ready || failed) return;
          setHovering(true);
          applyPointer(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (!ready || failed) return;
          setHovering(true);
          applyPointer(e.clientX, e.clientY);
        }}
        onPointerLeave={() => {
          setHovering(false);
          setTiltX(0);
          setTiltY(0);
        }}
      >
        {enabled && !failed && (
          <SceneBoundary onError={() => setFailed(true)}>
            <Scene
              active={visible}
              tiltX={tiltX}
              tiltY={tiltY}
              resetKey={resetKey}
              onReady={() => setReady(true)}
              onError={() => setFailed(true)}
              onStatus={setStatus}
            />
          </SceneBoundary>
        )}
        {(!enabled || !ready || failed) && (
          <div className="bop-overlay">
            {!enabled ? (
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("bop-playground", { detail: { active: true } })
                  );
                  setEnabled(true);
                }}
              >
                <Box size={17} /> Start interactive demo
              </button>
            ) : (
              <p role="status">
                {failed
                  ? "Interactive demo unavailable in this browser."
                  : "Loading the machine…"}
              </p>
            )}
          </div>
        )}
        <div className="bop-stage-caption">
          {ready && !failed
            ? hovering
              ? `Pitch ${(tiltX * 180) / Math.PI >= 0 ? "+" : ""}${((tiltX * 180) / Math.PI).toFixed(1)}° · Roll ${(tiltY * 180) / Math.PI >= 0 ? "+" : ""}${((tiltY * 180) / Math.PI).toFixed(1)}°`
              : "Move mouse to tilt · leave to level"
            : "Same CAD assembly as above"}
        </div>
      </div>

      <div className="bop-playground-controls bop-playground-controls-compact">
        <div className="bop-playground-actions">
          <button
            type="button"
            disabled={!ready || failed}
            onClick={() => setResetKey((v) => v + 1)}
            aria-label="Recenter ball"
          >
            <RotateCcw size={15} />
            <span>Recenter</span>
          </button>
        </div>
        <p className="bop-note bop-note-inline">
          {status}
          <span>±10° · free roll · rim bounce</span>
        </p>
      </div>
    </section>
  );
}
