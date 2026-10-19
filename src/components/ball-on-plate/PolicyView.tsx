"use client";

import { memo, useId, useState } from 'react';
import type { PolicySample } from './replay';

const degrees = (r: number) => r * 180 / Math.PI;
const format = (v: number, unit: string) => `${Math.abs(v) < 0.05 ? '0.0' : v.toFixed(1)}${unit}`;
const layers = [8, 6, 6, 2];
function geometry(mobile: boolean) {
  const xs = mobile ? [124, 176, 224, 270] : [220, 340, 450, 560];
  return layers.map((count, layer) => Array.from({ length: count }, (_, i) => ({
    x: xs[layer], y: 140 + (i - (count - 1) / 2) * (layer === 3 ? 80 : 28),
  })));
}
// Static connections never rerender as the recorded values change.
const Connections = memo(function Connections({ mobile }: { mobile: boolean }) {
  const nodes = geometry(mobile);
  return <g aria-hidden="true">
    {nodes.slice(0, -1).flatMap((layer, l) => layer.flatMap((a, i) => nodes[l + 1].map((b, j) =>
      <line key={`${l}-${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" opacity=".10" />)))}
    {nodes.slice(1, 3).flatMap((layer, l) => layer.map((n, i) =>
      <circle key={`${l}-${i}`} cx={n.x} cy={n.y} r="3" fill="#eff6ff" stroke="currentColor" strokeOpacity=".45" />))}
  </g>;
});
export default function PolicyView({ sample, mobile }: { sample: PolicySample; mobile: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const nodes = geometry(mobile);
  const inputs = [
    ['Ball x', format(sample.position[0] * 100, ' cm')],
    ['Ball y', format(sample.position[1] * 100, ' cm')],
    ['Velocity x', format(sample.velocity[0] * 100, ' cm/s')],
    ['Velocity y', format(sample.velocity[1] * 100, ' cm/s')],
    ['Target x', format(sample.target[0] * 100, ' cm')],
    ['Target y', format(sample.target[1] * 100, ' cm')],
    ['Tilt x', format(degrees(sample.angles[0]), '°')],
    ['Tilt y', format(degrees(sample.angles[1]), '°')],
  ];
  return <aside className={`bop-policy ${expanded ? 'is-expanded' : ''}`} aria-label="Neural policy view">
    <div className="bop-policy-heading"><span>SAC <small>Neural policy · recorded inference</small></span>
      <button className="bop-policy-toggle" aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(v => !v)}>{expanded ? 'Hide neural policy −' : 'Show neural policy +'}</button>
    </div>
    <div className="bop-policy-body" id={id}>
      <svg className="bop-policy-graph" viewBox={`0 0 ${mobile ? 360 : 740} 280`} role="group" aria-label="SAC neural network: eight observations to two tilt commands. Hidden layers are schematic; activations are not shown.">
        <text x="0" y="16" className="bop-graph-caption">OBSERVATIONS</text>
        <text x={mobile ? 176 : 340} y="16" className="bop-graph-caption">SAC</text>
        <text x={mobile ? 280 : 580} y="16" className="bop-graph-caption">TILT CMD</text>
        <Connections mobile={mobile} />
        {inputs.map(([label, value], i) => {
          const n = nodes[0][i];
          return <g key={label} aria-label={`${label}: ${value}`}>
            <circle cx={n.x} cy={n.y} r="4" fill="#eff6ff" stroke="currentColor" />
            <text x="0" y={n.y + (mobile ? -5 : 4)} className="bop-graph-label">{label}</text>
            <text x={n.x - 12} y={n.y + (mobile ? 8 : 4)} textAnchor="end" className="bop-graph-value">{value}</text>
          </g>;
        })}
        {sample.command.map((radians, i) => {
          const n = nodes[3][i], angle = degrees(radians);
          return <g key={i} role="meter" aria-label={`Commanded ${i === 0 ? 'X' : 'Y'} tilt`} aria-valuemin={-10} aria-valuemax={10} aria-valuenow={Number(angle.toFixed(1))} aria-valuetext={`${angle.toFixed(1)} degrees`}>
            <circle cx={n.x} cy={n.y} r="5" fill="#2563eb" />
            <text x={n.x + 12} y={n.y - 7} className="bop-graph-label">{i === 0 ? 'X' : 'Y'} axis</text>
            <text x={n.x + 12} y={n.y + 12} className="bop-graph-output">{format(angle, '°')}</text>
          </g>;
        })}
      </svg>
      <p className="bop-policy-footnote">Schematic hidden layers · simulation units · outputs are commanded tilt</p>
    </div>
  </aside>;
}
