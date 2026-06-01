import { color, font, type, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import data from '../data/consulting.json';

const { effects } = data;

const ICON_CHARS = { users: '◎', rotate: '↻', heart: '♥', globe: '⊕' };

export default function ConsultingEffects() {
  const [cardsRef, cardsVisible] = useReveal({ threshold: 0.08 });

  return (
    <section id="effects" style={{
      background: color.bg,
      padding: `${layout.sectionY} ${layout.gut}`,
      maxWidth: layout.container,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      <SectionHeader
        label={effects.label}
        title={effects.headline}
        sub={effects.sub}
      />

      <div
        ref={cardsRef}
        className="cx-grid-2"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(12px, 1.5vw, 20px)',
        }}
      >
        {effects.items.map((item, i) => (
          <div
            key={item.title}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: layout.rMd,
              padding: 'clamp(12px, 1.5vw, 19px)',
              opacity: cardsVisible ? 1 : 0,
              transform: cardsVisible ? 'none' : 'translateY(16px)',
              transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
            }}
          >
            {/* Icon placeholder */}
            <div style={{
              width: 44,
              height: 44,
              background: 'rgba(124,58,237,0.15)',
              borderRadius: layout.rSm,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 18,
              color: color.primaryLight,
              fontSize: 22,
              fontWeight: 700,
            }}>
              {ICON_CHARS[item.icon] ?? '◈'}
            </div>

            <h3 style={{
              margin: '0 0 10px',
              fontFamily: font.family,
              fontSize: type.h3.size,
              fontWeight: 700,
              color: color.ink,
              lineHeight: 1.3,
            }}>
              {item.title}
            </h3>
            <p style={{
              margin: '0 0 12px',
              fontFamily: font.family,
              fontSize: type.body.size,
              color: color.inkMuted,
              lineHeight: 1.75,
              wordBreak: 'keep-all',
            }}>
              {item.desc}
            </p>
            <p style={{
              margin: 0,
              fontFamily: font.family,
              fontSize: 10,
              color: color.inkFaint,
              lineHeight: 1.5,
            }}>
              {item.source}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
