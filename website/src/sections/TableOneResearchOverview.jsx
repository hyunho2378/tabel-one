import { useRef } from 'react';
import { color, font, type, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import tableOneData from '../data/tableOne.json';

const { researchOverview } = tableOneData;
const fiveW1H = researchOverview['5w1h'];

const w1hEntries = [
  { key: 'WHO',   value: fiveW1H.who },
  { key: 'WHAT',  value: fiveW1H.what },
  { key: 'WHERE', value: fiveW1H.where },
  { key: 'WHEN',  value: fiveW1H.when },
  { key: 'WHY',   value: fiveW1H.why },
  { key: 'HOW',   value: fiveW1H.how },
];

export default function TableOneResearchOverview() {
  const [sectionRef, sectionVisible] = useReveal({ threshold: 0.05 });
  const [gridRef, gridVisible] = useReveal({ threshold: 0.1 });
  const [methodRef, methodVisible] = useReveal({ threshold: 0.1 });

  return (
    <section
      id="research"
      ref={sectionRef}
      style={{
        background: color.bg,
        paddingTop: layout.sectionY,
        paddingBottom: layout.sectionY,
        paddingLeft: layout.gut,
        paddingRight: layout.gut,
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <SectionHeader
          label="RESEARCH"
          title="어떻게 조사했나"
          sub="정량 설문 · 심층 인터뷰 · 서비스 사파리 — 3가지 방법론"
        />

        {/* 5W1H Grid */}
        <div
          ref={gridRef}
          className="t1-grid-3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(12px, 1.5vw, 20px)',
            marginBottom: 'clamp(32px, 4vw, 48px)',
          }}
        >
          {w1hEntries.map((entry, i) => (
            <div
              key={entry.key}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: layout.rMd,
                padding: 'clamp(16px, 2vw, 24px)',
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`,
              }}
            >
              <p
                style={{
                  margin: '0 0 10px',
                  fontFamily: font.family,
                  fontSize: type.caption.size,
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: color.primary,
                }}
              >
                {entry.key}
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: font.family,
                  fontSize: type.body.size,
                  fontWeight: type.body.weight,
                  lineHeight: type.body.lh,
                  color: color.ink,
                }}
              >
                {entry.value}
              </p>
            </div>
          ))}
        </div>

        {/* Methods Row */}
        <div
          ref={methodRef}
          className="t1-grid-3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(12px, 1.5vw, 20px)',
          }}
        >
          {researchOverview.methods.map((method, i) => (
            <div
              key={method.name}
              style={{
                background: 'rgba(124,58,237,0.06)',
                border: '1px solid rgba(124,58,237,0.15)',
                borderRadius: layout.rMd,
                padding: 'clamp(16px, 2vw, 24px)',
                opacity: methodVisible ? 1 : 0,
                transform: methodVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              {/* Placeholder icon */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: 'rgba(124,58,237,0.15)',
                  borderRadius: layout.rSm,
                  marginBottom: 16,
                }}
              />

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: font.family,
                    fontSize: type.h3.size,
                    fontWeight: type.h3.weight,
                    lineHeight: type.h3.lh,
                    letterSpacing: type.h3.ls,
                    color: color.ink,
                  }}
                >
                  {method.name}
                </h3>
                <span
                  style={{
                    flexShrink: 0,
                    background: 'rgba(124,58,237,0.20)',
                    color: color.primary,
                    fontFamily: font.family,
                    fontSize: type.caption.size,
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 999,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {method.n}
                </span>
              </div>

              <p
                style={{
                  margin: 0,
                  fontFamily: font.family,
                  fontSize: type.body.size,
                  fontWeight: type.body.weight,
                  lineHeight: type.body.lh,
                  color: color.inkMuted,
                }}
              >
                {method.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
