import { useReveal } from '../lib/useReveal.js';
import { color, font, type } from '../tokens/web.js';

const PALETTE = [color.brand, color.brandSky, color.brandAlt, color.ok];

// segments: [{ label, value }]
export default function DonutChart({ segments = [], centerValue, centerLabel, size = 180, thickness = 28 }) {
  const [ref, visible] = useReveal({ threshold: 0.2 });

  const r = (size - thickness) / 2;
  const cx = size / 2;
  const circumference = 2 * Math.PI * r;
  const total = segments.reduce((s, d) => s + d.value, 0) || 1;

  // Precompute arc offsets
  const arcs = [];
  let accumulated = 0;
  for (const seg of segments) {
    const dash = (seg.value / total) * circumference;
    arcs.push({ ...seg, dash, accumulated });
    accumulated += dash;
  }

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* track */}
          <circle
            cx={cx} cy={cx} r={r}
            fill="none"
            stroke={color.line}
            strokeWidth={thickness}
          />
          {/* segments */}
          {arcs.map((arc, i) => (
            <circle
              key={i}
              cx={cx} cy={cx} r={r}
              fill="none"
              stroke={PALETTE[i % PALETTE.length]}
              strokeWidth={thickness}
              strokeDasharray={visible ? `${arc.dash} ${circumference - arc.dash}` : `0 ${circumference}`}
              strokeDashoffset={circumference - arc.accumulated}
              style={{ transition: `stroke-dasharray 0.75s cubic-bezier(.22,.68,0,1.2) ${i * 0.12}s` }}
            />
          ))}
        </svg>

        {(centerValue || centerLabel) && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          }}>
            {centerValue && (
              <span style={{
                fontFamily: font.family,
                fontSize: type.h2.size,
                fontWeight: type.h2.weight,
                color: color.ink,
                lineHeight: 1.1,
              }}>
                {centerValue}
              </span>
            )}
            {centerLabel && (
              <span style={{
                fontFamily: font.family,
                fontSize: type.caption.size,
                color: color.inkMuted,
              }}>
                {centerLabel}
              </span>
            )}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', justifyContent: 'center' }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: PALETTE[i % PALETTE.length], flexShrink: 0 }} />
            <span style={{ fontFamily: font.family, fontSize: type.caption.size, color: color.inkMuted }}>
              {seg.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
