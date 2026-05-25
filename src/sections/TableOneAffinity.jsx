import { useReveal } from '../lib/useReveal.js';
import { color, font, type, layout } from '../tokens/web.js';
import SectionHeader from '../components/SectionHeader.jsx';
import tableData from '../data/tableOne.json';

const { affinity } = tableData;

const CX_FLOW = [
  { label: '이해 가능',       highlight: false },
  { label: '통제 가능',       highlight: false },
  { label: '공정하게 느껴짐', highlight: false },
  { label: '존중',            highlight: true  },
  { label: '감정 경험',       highlight: false },
];

export default function TableOneAffinity() {
  const [cardsRef, cardsVisible] = useReveal({ threshold: 0.1 });
  const [coreRef, coreVisible]   = useReveal({ threshold: 0.2 });
  const [flowRef, flowVisible]   = useReveal({ threshold: 0.2 });

  return (
    <section id="affinity" style={{
      background: color.bg,
      padding: `${layout.sectionY} ${layout.gut}`,
      maxWidth: layout.container,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      <SectionHeader
        label="LATENT NEEDS"
        title="잠재 니즈 분석"
        sub="두 CJM의 감정 낙차 지점에서 도출한 잠재 니즈를 어피니티로 묶었다"
      />

      {/* Cluster cards 2×2 */}
      <div
        ref={cardsRef}
        className="t1-grid-2"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(12px, 1.5vw, 20px)',
        }}
      >
        {affinity.clusters.map((cluster, i) => {
          const num = String(i + 1).padStart(2, '0');
          return (
            <div
              key={cluster.cluster}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: layout.rMd,
                padding: 'clamp(20px, 2.5vw, 32px)',
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? 'none' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              {/* Number */}
              <div style={{
                fontFamily: font.family,
                fontSize: 'clamp(28px, 3vw, 44px)',
                fontWeight: 800,
                color: color.brand,
                lineHeight: 1,
                marginBottom: 12,
              }}>
                {num}
              </div>

              {/* Cluster name */}
              <p style={{
                margin: '0 0 6px',
                fontFamily: font.family,
                fontSize: type.h3.size,
                fontWeight: type.h3.weight,
                color: color.ink,
                lineHeight: type.h3.lh,
              }}>
                {cluster.cluster}
              </p>

              {/* Desc */}
              <p style={{
                margin: '0 0 14px',
                fontFamily: font.family,
                fontSize: type.body.size,
                color: color.inkMuted,
                lineHeight: 1.6,
              }}>
                {cluster.desc}
              </p>

              {/* Persona pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {cluster.personas.map(persona => (
                  <span
                    key={persona}
                    style={{
                      fontFamily: font.family,
                      fontSize: type.caption.size,
                      fontWeight: 600,
                      color: color.brand,
                      background: 'rgba(254,73,1,0.12)',
                      border: '1px solid rgba(254,73,1,0.2)',
                      borderRadius: 999,
                      padding: '3px 10px',
                    }}
                  >
                    {persona}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Convergence visualization */}
      <div style={{ position: 'relative' }}>
        {/* SVG lines: 4 clusters → center */}
        <svg
          width="100%"
          height="72"
          viewBox="0 0 800 72"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <line x1="100" y1="0" x2="400" y2="62" stroke="rgba(254,73,1,0.35)" strokeWidth="1.5" strokeDasharray="6 4" />
          <line x1="300" y1="0" x2="400" y2="62" stroke="rgba(254,73,1,0.25)" strokeWidth="1"   strokeDasharray="5 4" />
          <line x1="500" y1="0" x2="400" y2="62" stroke="rgba(254,73,1,0.25)" strokeWidth="1"   strokeDasharray="5 4" />
          <line x1="700" y1="0" x2="400" y2="62" stroke="rgba(254,73,1,0.35)" strokeWidth="1.5" strokeDasharray="6 4" />
          <polygon points="395,66 405,66 400,72" fill="rgba(254,73,1,0.6)" />
        </svg>

        {/* Core need box */}
        <div
          ref={coreRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: 'clamp(32px, 4vw, 56px)',
            opacity: coreVisible ? 1 : 0,
            transform: coreVisible ? 'none' : 'translateY(16px)',
            transition: 'opacity 0.65s ease, transform 0.65s ease',
          }}
        >
          <div style={{
            background: 'rgba(254,73,1,0.12)',
            border: '1px solid rgba(254,73,1,0.5)',
            borderRadius: layout.rLg,
            padding: 'clamp(20px, 2.5vw, 32px) clamp(32px, 5vw, 72px)',
            textAlign: 'center',
            maxWidth: 640,
          }}>
            <p style={{
              margin: '0 0 10px',
              fontFamily: font.family,
              fontSize: type.caption.size,
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: color.brand,
            }}>
              CORE NEED
            </p>
            <p style={{
              margin: 0,
              fontFamily: font.family,
              fontSize: type.h3.size,
              fontWeight: 700,
              color: color.ink,
              lineHeight: 1.45,
              wordBreak: 'keep-all',
            }}>
              {affinity.coreNeed}
            </p>
          </div>
        </div>
      </div>

      {/* CX value flow */}
      <div
        ref={flowRef}
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: layout.rLg,
          padding: 'clamp(24px, 3vw, 40px)',
          opacity: flowVisible ? 1 : 0,
          transform: flowVisible ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}
      >
        <p style={{
          margin: '0 0 20px',
          fontFamily: font.family,
          fontSize: type.caption.size,
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: color.inkFaint,
          textAlign: 'center',
        }}>
          잠재 니즈 → CX 가치 전환
        </p>

        {/* Flow steps */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 0,
        }}>
          {CX_FLOW.map((step, i) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                padding: 'clamp(8px, 1vw, 12px) clamp(12px, 1.5vw, 20px)',
                borderRadius: layout.rSm,
                background: step.highlight ? color.brand : 'rgba(255,255,255,0.05)',
                border: `1px solid ${step.highlight ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
              }}>
                <span style={{
                  fontFamily: font.family,
                  fontSize: type.body.size,
                  fontWeight: step.highlight ? 800 : 500,
                  color: step.highlight ? '#fff' : color.ink,
                  whiteSpace: 'nowrap',
                }}>
                  {step.label}
                </span>
              </div>
              {i < CX_FLOW.length - 1 && (
                <span style={{
                  fontFamily: font.family,
                  fontSize: 'clamp(14px, 1.5vw, 18px)',
                  color: color.inkFaint,
                  margin: '0 clamp(4px, 0.8vw, 10px)',
                  userSelect: 'none',
                }}>
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p style={{
          margin: 'clamp(16px, 2vw, 24px) 0 0',
          fontFamily: font.family,
          fontSize: type.body.size,
          fontStyle: 'italic',
          color: color.inkMuted,
          textAlign: 'center',
        }}>
          "Nothing is reduced simply because you are alone"
        </p>
      </div>
    </section>
  );
}
