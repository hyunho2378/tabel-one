import { useReveal } from '../lib/useReveal.js';
import { color, font, type } from '../tokens/web.js';

// Single-group: items = [{ label, value, pct? }], group = 'korean' | 'international'
// Dual-group:  items = [{ label, korean, international }], group = 'both'
export default function BarChart({ items = [], group = 'both', maxValue }) {
  const [ref, visible] = useReveal({ threshold: 0.1 });

  const computedMax = maxValue ?? Math.max(
    ...items.map(item =>
      group === 'both'
        ? Math.max(item.korean ?? 0, item.international ?? 0)
        : (item.value ?? 0)
    ),
    1
  );

  const korColor  = color.brand;
  const intlColor = color.brandSky;

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {items.map((item, i) => (
        <div key={i}>
          <div style={{
            fontFamily: font.family,
            fontSize: type.body.size,
            color: color.inkMuted,
            marginBottom: 8,
          }}>
            {item.label}
          </div>

          {group === 'both' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[
                { val: item.korean,        col: korColor,  dot: korColor,  suffix: item.korean },
                { val: item.international, col: intlColor, dot: intlColor, suffix: item.international },
              ].map(({ val, col, dot, suffix }, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: dot, flexShrink: 0 }} />
                  <div style={{ flex: 1, height: 10, background: color.line, borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: visible ? `${(val / computedMax) * 100}%` : '0%',
                      background: col,
                      borderRadius: 999,
                      transition: `width 0.7s cubic-bezier(.22,.68,0,1.2) ${i * 0.07 + j * 0.05}s`,
                    }} />
                  </div>
                  <span style={{
                    fontFamily: font.family,
                    fontSize: type.caption.size,
                    color: color.ink,
                    minWidth: 24,
                    textAlign: 'right',
                  }}>
                    {suffix}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 12, background: color.line, borderRadius: 999, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: visible ? `${(item.value / computedMax) * 100}%` : '0%',
                  background: group === 'international' ? intlColor : korColor,
                  borderRadius: 999,
                  transition: `width 0.7s cubic-bezier(.22,.68,0,1.2) ${i * 0.07}s`,
                }} />
              </div>
              <span style={{
                fontFamily: font.family,
                fontSize: type.caption.size,
                color: color.ink,
                minWidth: 36,
                textAlign: 'right',
              }}>
                {item.pct ?? item.value}
              </span>
            </div>
          )}
        </div>
      ))}

      {group === 'both' && (
        <div style={{ display: 'flex', gap: 20, marginTop: 4 }}>
          {[
            { col: korColor,  label: '한국인' },
            { col: intlColor, label: '외국인' },
          ].map(({ col, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: col }} />
              <span style={{ fontFamily: font.family, fontSize: type.caption.size, color: color.inkMuted }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
