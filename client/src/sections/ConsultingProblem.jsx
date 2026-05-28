import { color, font, type, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import data from '../data/consulting.json';

const { problem } = data;

function ClaimItem({ claim, i, visible }) {
  return (
    <div style={{
      paddingTop: 'clamp(17px, 2.1vw, 29px)',
      paddingBottom: 'clamp(17px, 2.1vw, 29px)',
      borderBottom: i < problem.claims.length - 1 ? `1px solid ${color.line}` : 'none',
      display: 'flex',
      gap: 'clamp(20px, 3vw, 48px)',
      alignItems: 'flex-start',
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(20px)',
      transition: `opacity 0.65s ease ${i * 0.12}s, transform 0.65s ease ${i * 0.12}s`,
    }}>
      {/* Number */}
      <span style={{
        fontFamily: font.family,
        fontSize: 'clamp(11px, 1vw, 13px)',
        fontWeight: 700,
        color: color.inkFaint,
        letterSpacing: '0.08em',
        flexShrink: 0,
        paddingTop: 5,
        minWidth: '2ch',
      }}>
        {String(i + 1).padStart(2, '0')}
      </span>

      {/* Content */}
      <div style={{ flex: 1 }}>
        {/* Claim */}
        <p style={{
          margin: '0 0 clamp(12px, 1.5vw, 18px)',
          fontFamily: font.family,
          fontSize: 'clamp(18px, 2.2vw, 32px)',
          fontWeight: 700,
          color: color.ink,
          lineHeight: 1.3,
          letterSpacing: '-0.02em',
          wordBreak: 'keep-all',
        }}>
          {claim.claim}
        </p>

        {/* Evidence */}
        <div style={{
          borderLeft: `2px solid ${color.primary}`,
          paddingLeft: 'clamp(12px, 1.5vw, 20px)',
          marginBottom: 10,
        }}>
          <p style={{
            margin: 0,
            fontFamily: font.family,
            fontSize: type.lead.size,
            color: color.inkMuted,
            lineHeight: 1.75,
            wordBreak: 'keep-all',
          }}>
            {claim.evidence}
          </p>
        </div>

        {/* Source */}
        <p style={{
          margin: 0,
          fontFamily: font.family,
          fontSize: 10,
          color: color.inkFaint,
          lineHeight: 1.5,
        }}>
          {claim.source}
        </p>
      </div>
    </div>
  );
}

export default function ConsultingProblem() {
  const [listRef, listVisible] = useReveal({ threshold: 0.06 });
  const [closingRef, closingVisible] = useReveal({ threshold: 0.2 });

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

      {/* Claims list */}
      <div ref={listRef}>
        {problem.claims.map((claim, i) => (
          <ClaimItem key={claim.id} claim={claim} i={i} visible={listVisible} />
        ))}
      </div>

      {/* Closing */}
      <div
        ref={closingRef}
        style={{
          marginTop: 'clamp(19px, 2.4vw, 34px)',
          borderLeft: `4px solid ${color.primary}`,
          background: 'rgba(124,58,237,0.06)',
          borderRadius: '0 8px 8px 0',
          padding: 'clamp(12px, 1.5vw, 19px)',
          opacity: closingVisible ? 1 : 0,
          transform: closingVisible ? 'none' : 'translateX(-16px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <p style={{
          margin: 0,
          fontFamily: font.family,
          fontSize: 'clamp(15px, 1.5vw, 22px)',
          fontWeight: 600,
          color: color.ink,
          lineHeight: 1.65,
          wordBreak: 'keep-all',
        }}>
          {problem.closing}
        </p>
      </div>
    </section>
  );
}
