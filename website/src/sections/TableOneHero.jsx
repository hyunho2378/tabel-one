import { useReveal } from '../lib/useReveal.js';
import { useCountUp } from '../lib/useCountUp.js';
import { color, font, type, layout } from '../tokens/web.js';
import data from '../data/tableOne.json';

const { hero, stats, meta } = data;

function parseNum(val) {
  const m = String(val).match(/^(\d+)(.*)/);
  return m ? { num: parseInt(m[1], 10), suffix: m[2] } : null;
}

// Sub-component: stat with countUp (must be a component to call useCountUp at top level)
function NumericStat({ stat }) {
  const parsed = parseNum(stat.value);
  const [ref, value] = useCountUp(parsed.num, 1400);
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: font.family,
        fontSize: 'clamp(28px, 3.8vw, 52px)',
        fontWeight: 800,
        color: color.primary,
        lineHeight: 1,
        letterSpacing: '-0.03em',
      }}>
        {value}{parsed.suffix}
      </div>
      <div style={{
        fontFamily: font.family,
        fontSize: type.body.size,
        fontWeight: 500,
        color: color.ink,
        marginTop: 10,
      }}>
        {stat.label}
      </div>
      <div style={{
        fontFamily: font.family,
        fontSize: type.caption.size,
        color: color.inkMuted,
        marginTop: 4,
      }}>
        {stat.sub}
      </div>
    </div>
  );
}

function TextStat({ stat }) {
  const [ref, visible] = useReveal({ threshold: 0.3 });
  return (
    <div ref={ref} style={{
      textAlign: 'center',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.6s ease',
    }}>
      <div style={{
        fontFamily: font.family,
        fontSize: 'clamp(16px, 1.8vw, 26px)',
        fontWeight: 800,
        color: color.primary,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      }}>
        {stat.value}
      </div>
      <div style={{
        fontFamily: font.family,
        fontSize: type.body.size,
        fontWeight: 500,
        color: color.ink,
        marginTop: 10,
      }}>
        {stat.label}
      </div>
      <div style={{
        fontFamily: font.family,
        fontSize: type.caption.size,
        color: color.inkMuted,
        marginTop: 4,
      }}>
        {stat.sub}
      </div>
    </div>
  );
}

export default function TableOneHero() {
  const [ref, visible] = useReveal({ threshold: 0.05 });

  // Build stats row with dividers
  const statRow = [];
  stats.forEach((stat, i) => {
    if (i > 0) {
      statRow.push(
        <div key={`div-${i}`} style={{
          width: 1,
          alignSelf: 'stretch',
          background: 'rgba(255,255,255,0.15)',
          flexShrink: 0,
          margin: '0 clamp(20px, 3vw, 48px)',
        }} />
      );
    }
    const parsed = parseNum(stat.value);
    statRow.push(
      <div key={`stat-${i}`} style={{ flex: 1 }}>
        {parsed ? <NumericStat stat={stat} /> : <TextStat stat={stat} />}
      </div>
    );
  });

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        minHeight: 'clamp(600px, 85vh, 900px)',
        background: color.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `80px ${layout.gut}`,
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        @keyframes t1-bounce {
          0%, 100% { transform: translate(-50%, 0); }
          50%       { transform: translate(-50%, 10px); }
        }
      `}</style>

      {/* Meta */}
      <div style={{
        textAlign: 'center',
        marginBottom: 40,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(-16px)',
        transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
      }}>
        <p style={{
          margin: '0 0 4px',
          fontFamily: font.family,
          fontSize: type.caption.size,
          color: color.inkMuted,
        }}>
          {meta.team} · {meta.course}
        </p>
        <p style={{
          margin: 0,
          fontFamily: font.family,
          fontSize: type.caption.size,
          color: color.inkMuted,
        }}>
          {meta.professor}
        </p>
      </div>

      {/* Headline */}
      <div style={{
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(-12px)',
        transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
      }}>
        <h1 style={{
          margin: '0 0 24px',
          fontFamily: font.family,
          fontSize: type.display.size,
          fontWeight: 800,
          lineHeight: 1.12,
          letterSpacing: '-0.04em',
          color: color.ink,
          wordBreak: 'keep-all',
        }}>
          {hero.headline}
        </h1>
        <p style={{
          margin: 0,
          fontFamily: font.family,
          fontSize: type.lead.size,
          fontWeight: type.lead.weight,
          lineHeight: type.lead.lh,
          color: color.inkMuted,
          wordBreak: 'keep-all',
        }}>
          {hero.subheadline}
        </p>
      </div>

      {/* Stats bar */}
      <div className="t1-stats-bar" style={{
        display: 'flex',
        alignItems: 'stretch',
        width: '100%',
        marginTop: 64,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease 0.65s',
      }}>
        {statRow}
      </div>

      {/* Scroll arrow */}
      <div style={{
        position: 'absolute',
        bottom: 36,
        left: '50%',
        animation: 't1-bounce 2.2s ease-in-out infinite',
        opacity: visible ? 0.45 : 0,
        transition: 'opacity 0.6s ease 1.1s',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5v14M5 13l7 7 7-7"
            stroke={color.ink}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
