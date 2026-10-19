"use client";

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { Box, ScanLine } from 'lucide-react';

import PolicyView from './PolicyView';
import type { PolicySample } from './replay';

const Scene = dynamic(() => import('./BallOnPlateScene'), { ssr: false });
class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}
export default function BallOnPlateViewer({ eager = false }: { eager?: boolean } = {}) {
  const host = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(eager);
  const [visible, setVisible] = useState(false);
  const [tabActive, setTabActive] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [resetCamera, setResetCamera] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [policy, setPolicy] = useState<PolicySample | null>(null);
  const [scaled, setScaled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const small = window.matchMedia('(max-width: 767px)');
    const updateSize = () => setMobile(small.matches);
    const updateReduced = () => setReducedMotion(reduced.matches);
    updateSize();
    updateReduced();
    small.addEventListener('change', updateSize);
    reduced.addEventListener('change', updateReduced);
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    // Automatic playback is only requested on the first entrance.
    let entered = false;
    const onceObserver = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (!entered && entry.isIntersecting) {
        entered = true;
        if (!small.matches && !connection?.saveData) setEnabled(true);
      }
    }, { threshold: 0.15 });
    if (host.current) onceObserver.observe(host.current);
    const onVisibility = () => setTabActive(!document.hidden);
    // Free the GPU when the mouse-tilt playground starts (one WebGL context at a time).
    const onPlayground = (event: Event) => {
      const active = Boolean((event as CustomEvent<{ active?: boolean }>).detail?.active);
      if (active) {
        setEnabled(false);
        setReady(false);
        setPolicy(null);
      }
    };
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('bop-playground', onPlayground);
    return () => {
      onceObserver.disconnect();
      small.removeEventListener('change', updateSize);
      reduced.removeEventListener('change', updateReduced);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('bop-playground', onPlayground);
    };
  }, []);

  const activate = () => setEnabled(true);
  // Always looping while visible — no play/pause UI.
  const playing = enabled && ready && !failed && !reducedMotion && visible && tabActive;

  return <section className="bop-viewer" aria-label="Interactive Ball-on-Plate simulation" ref={host}>
    <div className="bop-stage">
      <Image src="/models/ball-on-plate/card.png" alt="The real Ball-on-Plate CAD assembly, viewed from above at an angle" fill priority sizes="(max-width: 880px) 100vw, 880px" className="bop-poster" unoptimized />
      <div className="bop-heading"><span>Interactive CAD</span><span>SAC replay</span></div>
      {enabled && !failed && <SceneBoundary onError={() => setFailed(true)}>
        <Scene
          active={visible && tabActive}
          playing={playing}
          restart={0}
          resetCamera={resetCamera}
          mobile={mobile}
          onReady={(isScaled) => { setReady(true); setScaled(isScaled); }}
          onProgress={setProgress}
          onPolicy={setPolicy}
          onEnd={() => { /* looping handled in the scene */ }}
          onError={() => setFailed(true)}
        />
      </SceneBoundary>}
      {(!enabled || !ready || failed) && <div className="bop-overlay">
        {!enabled ? <button onClick={activate}><Box size={17} /> Explore in 3D</button> :
          <p role="status">{failed ? '3D is unavailable. You can still explore the hardware videos below.' : 'Preparing the machine…'}</p>}
      </div>}
      <div className="bop-stage-caption">{ready && !failed ? (mobile ? 'Drag sideways to orbit · pinch to zoom' : 'Drag to orbit · scroll to zoom') : 'Ball-on-Plate / original CAD assembly'}</div>
    </div>
    {ready && !failed && policy && <PolicyView sample={policy} mobile={mobile} />}
    <div className="bop-controls">
      <div className="bop-buttons">
        <button disabled={!ready || failed} aria-label="Reset camera" onClick={() => setResetCamera(v => v + 1)}><ScanLine size={16} /><span>Reset view</span></button>
      </div>
      <span className="bop-time">{progress.toFixed(1).padStart(4, '0')} / 20 s</span>
    </div>
    <div className="bop-progress" role="progressbar" aria-label="Replay progress" aria-valuemin={0} aria-valuemax={20} aria-valuenow={Math.round(progress)}><span style={{ width: `${progress * 5}%` }} /></div>
    <p className="bop-note">{scaled ? 'Simulation replay · looping · position scaled to CAD' : 'Simulation replay · looping'}<span>Soft Actor-Critic · 20-second rollout</span></p>
  </section>;
}
