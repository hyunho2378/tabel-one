import { useReveal } from '../lib/useReveal.js';
import { color, font, type, layout } from '../tokens/web.js';
import SectionHeader from '../components/SectionHeader.jsx';
import tableData from '../data/tableOne.json';

const { insights } = tableData;

export default function TableOneInsights() {
  const [ref, visible] = useReveal({ threshold: 0.1 });

  return (
    <section id="insights" style={{
      background: '#111111',
      padding: `${layout.sectionY} ${layout.gut}`,
      maxWidth: layout.container,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      <SectionHeader
        label="KEY INSIGHTS"
        title="핵심 인사이트"
        sub="리서치 전반에서 수렴된 세 가지 핵심 발견 — 문제의 본질을 정의한다"
      />

      <div
        ref={ref}
        className="t1-grid-3"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(14px, 1.8vw, 24px)',
        }}
      >
        {insights.map((insight, i) => (
          <div
            key={insight.no}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: layout.rLg,
              padding: 'clamp(24px, 3vw, 40px)',
              display: 'flex',
              flexDirection: 'column',
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(24px)',
              transition: `opacity 0.65s ease ${i * 0.12}s, transform 0.65s ease ${i * 0.12}s`,
            }}
          >
            {/* Number */}
            <div style={{
              fontFamily: font.family,
              fontSize: 'clamp(40px, 5vw, 72px)',
              fontWeight: 800,
              color: color.primary,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              marginBottom: 20,
              opacity: 0.9,
            }}>
              {insight.no}
            </div>

            {/* Title */}
            <p style={{
              margin: '0 0 14px',
              fontFamily: font.family,
              fontSize: type.h3.size,
              fontWeight: 700,
              color: color.ink,
              lineHeight: type.h3.lh,
              wordBreak: 'keep-all',
            }}>
              {insight.title}
            </p>

            {/* Desc */}
            <p style={{
              margin: 0,
              fontFamily: font.family,
              fontSize: type.body.size,
              color: color.inkMuted,
              lineHeight: 1.75,
              wordBreak: 'keep-all',
              flexGrow: 1,
            }}>
              {insight.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
