import { useReveal } from '../lib/useReveal.js';
import { color, font, type, layout } from '../tokens/web.js';
import SectionHeader from '../components/SectionHeader.jsx';
import data from '../data/tableOne.json';

const { overview, meta } = data;

// Highlight "Nothing is reduced simply because you are alone" in brand orange
function CxValueText({ text }) {
  const HIGHLIGHT = 'Nothing is reduced simply because you are alone';
  const idx = text.indexOf(HIGHLIGHT);
  if (idx === -1) {
    return <span>{text}</span>;
  }
  return (
    <>
      <span>{text.slice(0, idx)}</span>
      <span style={{ color: color.primary }}>{HIGHLIGHT}</span>
      <span>{text.slice(idx + HIGHLIGHT.length)}</span>
    </>
  );
}

const INFO_ROWS = [
  { label: '서비스명',  value: meta.serviceName },
  { label: '팀',        value: meta.team },
  { label: '멤버',      value: meta.members.join(' / ') },
  { label: '기간',      value: meta.period },
  { label: '수업',      value: meta.course },
  { label: '방법론',    value: meta.methodology },
  { label: '지역',      value: meta.location },
];

const RIGHT_BLOCKS = [
  { label: 'THE PROBLEM',     text: overview.problem },
  { label: 'OUR APPROACH',    text: overview.approach },
  { label: 'DIFFERENTIATION', text: overview.differentiation },
];

export default function TableOneOverview() {
  const [leftRef, leftVisible]   = useReveal({ threshold: 0.1 });
  const [rightRef, rightVisible] = useReveal({ threshold: 0.1 });
  const [bannerRef, bannerVisible] = useReveal({ threshold: 0.2 });

  return (
    <section id="overview" style={{
      background: color.bg,
      padding: `${layout.sectionY} ${layout.gut}`,
      maxWidth: layout.container,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      <SectionHeader
        label="PROJECT OVERVIEW"
        title="Table One이란"
        sub={`${meta.subtitle} — ${meta.period}`}
      />

      {/* 2-column grid */}
      <div className="t1-overview-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)',
        gap: 'clamp(24px, 4vw, 64px)',
        alignItems: 'start',
        marginBottom: 'clamp(40px, 6vw, 80px)',
      }}>

        {/* Left: info card */}
        <div
          ref={leftRef}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: layout.rLg,
            padding: 'clamp(24px, 3vw, 40px)',
            opacity: leftVisible ? 1 : 0,
            transform: leftVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.65s ease, transform 0.65s ease',
          }}
        >
          {INFO_ROWS.map(({ label, value }, i) => (
            <div
              key={label}
              style={{
                display: 'flex',
                gap: 16,
                paddingTop: i === 0 ? 0 : 14,
                paddingBottom: i === INFO_ROWS.length - 1 ? 0 : 14,
                borderBottom: i < INFO_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <span style={{
                fontFamily: font.family,
                fontSize: type.caption.size,
                color: color.inkFaint,
                minWidth: 60,
                paddingTop: 2,
                flexShrink: 0,
              }}>
                {label}
              </span>
              <span style={{
                fontFamily: font.family,
                fontSize: type.body.size,
                color: color.ink,
                lineHeight: 1.6,
                wordBreak: 'keep-all',
              }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Right: 3 text blocks */}
        <div
          ref={rightRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(24px, 3vw, 40px)',
          }}
        >
          {RIGHT_BLOCKS.map(({ label, text }, i) => (
            <div
              key={label}
              style={{
                opacity: rightVisible ? 1 : 0,
                transform: rightVisible ? 'none' : 'translateY(16px)',
                transition: `opacity 0.65s ease ${i * 0.12}s, transform 0.65s ease ${i * 0.12}s`,
              }}
            >
              <p style={{
                margin: '0 0 8px',
                fontFamily: font.family,
                fontSize: type.caption.size,
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: color.primary,
              }}>
                {label}
              </p>
              <p style={{
                margin: 0,
                fontFamily: font.family,
                fontSize: type.lead.size,
                lineHeight: type.lead.lh,
                color: color.ink,
                wordBreak: 'keep-all',
              }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CX value banner */}
      <div
        ref={bannerRef}
        style={{
          background: 'rgba(124,58,237,0.06)',
          border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: layout.rLg,
          padding: 'clamp(28px, 4vw, 56px) clamp(24px, 4vw, 56px)',
          textAlign: 'center',
          opacity: bannerVisible ? 1 : 0,
          transform: bannerVisible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}
      >
        <p style={{
          margin: '0 0 8px',
          fontFamily: font.family,
          fontSize: type.caption.size,
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: color.inkFaint,
        }}>
          CX CORE VALUE
        </p>
        <p style={{
          margin: 0,
          fontFamily: font.family,
          fontSize: 'clamp(16px, 2vw, 26px)',
          fontWeight: 700,
          lineHeight: 1.5,
          color: color.inkMuted,
          wordBreak: 'keep-all',
        }}>
          <CxValueText text={overview.cxValue} />
        </p>
      </div>
    </section>
  );
}
