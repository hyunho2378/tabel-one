import { useReveal } from '../lib/useReveal.js';
import { color, font, type, layout } from '../tokens/web.js';
import SectionHeader from '../components/SectionHeader.jsx';
import tableData from '../data/tableOne.json';

const { persona } = tableData;

const ACCENT = { korean: color.brand, international: color.brandSky };

function PersonaCard({ p, visible, delay }) {
  const accent = ACCENT[p.id];
  const extraFields = p.id === 'international'
    ? [{ label: '한국어 수준', value: p.koreanLevel }]
    : [];

  const infoFields = [
    { label: '나이',   value: p.age },
    { label: '소속',   value: p.affiliation },
    { label: '혼밥 빈도', value: p.frequency },
    { label: '예산',   value: p.budget },
    { label: '검색 수단', value: p.discovery },
    ...extraFields,
  ];

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid rgba(255,255,255,0.08)`,
      borderTop: `3px solid ${accent}`,
      borderRadius: layout.rLg,
      padding: 'clamp(24px, 3vw, 40px)',
      display: 'flex',
      flexDirection: 'column',
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(24px)',
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {/* Name + badge */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{
            fontFamily: font.family,
            fontSize: type.caption.size,
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: accent,
          }}>
            {p.id === 'korean' ? 'KOREAN PERSONA' : 'INTERNATIONAL PERSONA'}
          </span>
        </div>
        <p style={{
          margin: 0,
          fontFamily: font.family,
          fontSize: type.h2.size,
          fontWeight: type.h2.weight,
          color: color.ink,
          lineHeight: 1.2,
        }}>
          {p.name}
        </p>
      </div>

      {/* Info rows */}
      <div style={{ marginBottom: 24 }}>
        {infoFields.map(({ label, value }, i) => (
          <div key={label} style={{
            display: 'flex',
            gap: 12,
            padding: '10px 0',
            borderBottom: i < infoFields.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}>
            <span style={{
              fontFamily: font.family,
              fontSize: type.caption.size,
              color: color.inkFaint,
              minWidth: 72,
              flexShrink: 0,
              paddingTop: 2,
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

      {/* Pain points */}
      <div style={{ marginBottom: 24 }}>
        <p style={{
          margin: '0 0 10px',
          fontFamily: font.family,
          fontSize: type.caption.size,
          fontWeight: 800,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: color.warn,
        }}>
          PAIN POINTS
        </p>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {p.painPoints.map((pt, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: color.warn,
                marginTop: 7,
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: font.family,
                fontSize: type.body.size,
                color: color.inkMuted,
                lineHeight: 1.65,
                wordBreak: 'keep-all',
              }}>
                {pt}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quote */}
      <div style={{
        marginTop: 'auto',
        background: `rgba(${p.id === 'korean' ? '254,73,1' : '255,140,90'},0.1)`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: '0 8px 8px 0',
        padding: '14px 16px',
      }}>
        <p style={{
          margin: 0,
          fontFamily: font.family,
          fontSize: type.body.size,
          fontStyle: 'italic',
          color: color.ink,
          lineHeight: 1.7,
          wordBreak: 'keep-all',
        }}>
          "{p.quote}"
        </p>
      </div>
    </div>
  );
}

export default function TableOnePersona() {
  const [ref, visible] = useReveal({ threshold: 0.1 });

  return (
    <section id="persona" style={{
      background: '#111111',
      padding: `${layout.sectionY} ${layout.gut}`,
      maxWidth: layout.container,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      <SectionHeader
        label="PERSONA"
        title="페르소나"
        sub="두 극단 사용자 — 한국인 혼밥러와 외국인 유학생 — 의 경험 격차를 분석했다"
      />

      <div
        ref={ref}
        className="t1-grid-2"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(16px, 2vw, 28px)',
        }}
      >
        {persona.map((p, i) => (
          <PersonaCard key={p.id} p={p} visible={visible} delay={i * 0.12} />
        ))}
      </div>
    </section>
  );
}
