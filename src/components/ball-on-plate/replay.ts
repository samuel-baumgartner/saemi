export type ReplayFrame = [number, number, number, number, number, number, number, number];
export interface Replay {
  policy: { version: number; frames: [number, number, number, number][] };
  version: number;
  duration: number;
  dt: number;
  plateSize: [number, number];
  ballRadius: number;
  frames: ReplayFrame[];
}
export interface ModelConfig {
  plateSize: [number, number];
  plateCenter: [number, number, number];
  outerPivot: [number, number, number];
  innerPivot: [number, number, number];
  target: [number, number, number];
  camera: [number, number, number];
  floor: number;
}
export function validateReplay(value: Replay): Replay {
  if (value.version !== 1 || value.duration !== 20 || value.frames?.length < 2 ||
      !value.plateSize?.every(v => Number.isFinite(v) && v > 0) || !(value.ballRadius > 0)) {
    throw new Error('Unsupported replay');
  }
  value.frames.forEach((f, i) => {
    if (f.length !== 8 || !f.every(Number.isFinite) ||
        (i > 0 && f[0] <= value.frames[i - 1][0]) ||
        Math.abs(f[3]) > Math.PI / 18 + 1e-6 || Math.abs(f[4]) > Math.PI / 18 + 1e-6) {
      throw new Error('Invalid replay frame');
    }
  });
  if (value.frames[0][0] !== 0 || value.frames.at(-1)![0] !== value.duration) throw new Error('Incomplete replay');
  if (value.policy?.version !== 1 || value.policy.frames?.length !== value.frames.length ||
      value.policy.frames.some(f => f.length !== 4 || !f.every(Number.isFinite) ||
        Math.abs(f[2]) > Math.PI / 18 + 1e-6 || Math.abs(f[3]) > Math.PI / 18 + 1e-6)) {
    throw new Error('Invalid policy telemetry');
  }
  return value;
}
export function sampleReplay(replay: Replay, time: number): ReplayFrame {
  const t = Math.max(0, Math.min(time, replay.duration));
  let lo = 0, hi = replay.frames.length - 1;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (replay.frames[mid][0] <= t) lo = mid;
    else hi = mid - 1;
  }
  const a = replay.frames[lo], b = replay.frames[Math.min(lo + 1, replay.frames.length - 1)];
  const u = b[0] === a[0] ? 0 : (t - a[0]) / (b[0] - a[0]);
  return [t, ...[1, 2, 3, 4].map(i => a[i] + (b[i] - a[i]) * u), a[5], a[6], a[7]] as ReplayFrame;
}

export interface PolicySample { position: number[]; velocity: number[]; target: number[]; angles: number[]; command: number[] }
export function samplePolicy(replay: Replay, time: number): PolicySample {
  // Commands are held between inference steps, never interpolated across target changes.
  let i = 0;
  let hi = replay.frames.length - 1;
  while (i < hi) {
    const mid = Math.ceil((i + hi) / 2);
    if (replay.frames[mid][0] <= time) i = mid; else hi = mid - 1;
  }
  const f = replay.frames[i], p = replay.policy.frames[i];
  return { position: f.slice(1, 3), velocity: p.slice(0, 2), target: f.slice(5, 7), angles: f.slice(3, 5), command: p.slice(2, 4) };
}
