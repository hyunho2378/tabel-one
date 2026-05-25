import { color, font, type, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import QuoteCard from '../components/QuoteCard.jsx';
import data from '../data/consulting.json';

const { problem } = data;

export default function ConsultingProblem() {
  const [cardsRef, cardsVisible] = useReveal({ threshold: 0.08 });
  const [insightRef, insightVisible] = useReveal({ threshold: 0.2 });

  return (
    <section id="problem" style={{
      background: '#111111',
      padding: `${layout.sectionY} ${layout.gut}`,
      maxWidth: layout.container,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      <SectionHeader
        label={problem.label}
        title={problem.headline}
        sub={problem.sub}
      />

      {/* Facts 2×2 grid */}
      <div
        ref={cardsRef}
        className="cx-grid-2"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(12px, 1.5vw, 20px)',
          marginBottom: 'clamp(32px, 4vw, 56px)',
        }}
      >
        {problem.facts.map((fact, i) => (
          <div
            key={fact.no}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: layout.rMd,
              padding: 'clamp(20px, 2.5vw, 32px)',
              opacity: cardsVisible ? 1 : 0,
              transform: cardsVisible ? 'none' : 'translateY(16px)',
              transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
            }}
          >
            <div style={{
              fontFamily: font.family,
              fontSize: 'clamp(18px, 1.8vw, 26px)',
              fontWeight: 800,
              color: color.primary,
              opacity: 0.5,
              lineHeight: 1,
              marginBottom: 12,
            }}>
              {fact.no}
            </div>
            <div style={{
              fontFamily: font.family,
              fontSize: 'clamp(26px, 3.2vw, 48px)',
              fontWeight: 800,
              color: color.ink,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: 14,
            }}>
              {fact.stat}
            </div>
            <p style={{
              margin: '0 0 10px',
              fontFamily: font.family,
              fontSize: type.body.size,
              color: color.inkMuted,
              lineHeight: 1.72,
              wordBreak: 'keep-all',
            }}>
              {fact.desc}
            </p>
            <p style={{
              margin: 0,
              fontFamily: font.family,
              fontSize: 10,
              color: color.inkFaint,
              lineHeight: 1.5,
            }}>
              {fact.source}
            </p>
          </div>
        ))}
      </div>

      {/* Insight banner */}
      <div
        ref={insightRef}
        style={{
          opacity: insightVisible ? 1 : 0,
          transform: insightVisible ? 'none' : 'translateX(-16px)',
          transition: 'opacity 0.55s ease, transform 0.55s ease',
        }}
      >
        <QuoteCard quote={problem.insight} />
      </div>
    </section>
  );
}
