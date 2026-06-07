import { color, font, type, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
export default function ConsultingPortfolio({ data }) {
  const { portfolio } = data;
  const [cardRef, cardVisible] = useReveal({ threshold: 0.05 });

  return (
    <section id="portfolio" style={{
      background: '#111111',
      padding: `${layout.sectionY} ${layout.gut}`,
      maxWidth: layout.container,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      <SectionHeader
        label={portfolio.label}
        title={portfolio.headline}
        sub={portfolio.sub}
      />

      {portfolio.cases.map((c, idx) => (
        <div
          key={c.id}
          ref={idx === 0 ? cardRef : undefined}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: layout.rLg,
            overflow: 'hidden',
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.65s ease, transform 0.65s ease',
          }}
        >
          {/* Meta header */}
          <div style={{
            background: 'rgba(124,58,237,0.08)',
            borderBottom: `1px solid ${color.line}`,
            padding: 'clamp(12px, 1.5vw, 19px)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px 24px',
            alignItems: 'center',
          }}>
            <span style={{ fontFamily: font.family, fontSize: type.h3.size, fontWeight: 800, color: color.ink }}>
              {c.client}
            </span>
            {[c.location, c.industry, c.period, c.type].map((v, i) => (
              <span key={i} style={{ fontFamily: font.family, fontSize: type.body.size, color: color.inkMuted }}>
                {v}
              </span>
            ))}
          </div>

          <div style={{ padding: 'clamp(14px, 1.8vw, 26px)' }}>

            {/* Challenge */}
            <div style={{
              background: 'rgba(124,58,237,0.07)',
              border: `1px solid ${color.line}`,
              borderRadius: layout.rMd,
              padding: 'clamp(10px, 1.2vw, 14px)',
              marginBottom: 'clamp(14px, 1.8vw, 22px)',
            }}>
              <p style={{
                margin: '0 0 7px',
                fontFamily: font.family,
                fontSize: type.caption.size,
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: color.primary,
              }}>
                CHALLENGE
              </p>
              <p style={{
                margin: 0,
                fontFamily: font.family,
                fontSize: type.lead.size,
                color: color.ink,
                lineHeight: 1.65,
                wordBreak: 'keep-all',
              }}>
                {c.challenge}
              </p>
            </div>

            {/* Approach & Solutions 2-col */}
            <div
              className="cx-grid-2"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'clamp(10px, 1.2vw, 17px)',
                marginBottom: 'clamp(14px, 1.8vw, 22px)',
              }}
            >
              <div>
                <p style={{
                  margin: '0 0 12px',
                  fontFamily: font.family,
                  fontSize: type.caption.size,
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: color.primaryLight,
                }}>
                  APPROACH
                </p>
                <ol style={{ margin: 0, padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {c.approach.map((a, i) => (
                    <li key={i} style={{
                      fontFamily: font.family,
                      fontSize: type.body.size,
                      color: color.inkMuted,
                      lineHeight: 1.65,
                    }}>
                      {a}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p style={{
                  margin: '0 0 12px',
                  fontFamily: font.family,
                  fontSize: type.caption.size,
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: color.primaryLight,
                }}>
                  SOLUTIONS
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {c.solutions.map((s, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ color: color.primary, fontWeight: 700, flexShrink: 0, lineHeight: 1.65 }}>✓</span>
                      <span style={{ fontFamily: font.family, fontSize: type.body.size, color: color.inkMuted, lineHeight: 1.65 }}>
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Key Insight */}
            <div style={{
              background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: layout.rMd,
              padding: 'clamp(10px, 1.2vw, 14px)',
              marginBottom: 'clamp(14px, 1.8vw, 22px)',
            }}>
              <p style={{
                margin: '0 0 7px',
                fontFamily: font.family,
                fontSize: type.caption.size,
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: color.primary,
              }}>
                KEY INSIGHT
              </p>
              <p style={{
                margin: 0,
                fontFamily: font.family,
                fontSize: type.lead.size,
                fontWeight: 600,
                color: color.ink,
                lineHeight: 1.6,
                wordBreak: 'keep-all',
              }}>
                {c.keyInsight}
              </p>
            </div>

            {/* Before / After 2-col */}
            <div
              className="cx-grid-2"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'clamp(7px, 0.9vw, 12px)',
                marginBottom: 'clamp(12px, 1.5vw, 19px)',
              }}
            >
              {/* Before */}
              <div style={{
                background: '#1A1A1A',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: layout.rMd,
                padding: 'clamp(16px, 2vw, 24px)',
              }}>
                <p style={{
                  margin: '0 0 12px',
                  fontFamily: font.family,
                  fontSize: type.caption.size,
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: color.inkFaint,
                }}>
                  개선 전
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {c.before.map((b, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ color: '#555', flexShrink: 0, lineHeight: 1.6 }}>✕</span>
                      <span style={{ fontFamily: font.family, fontSize: type.body.size, color: color.inkMuted, lineHeight: 1.6 }}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}
              <div style={{
                background: 'rgba(124,58,237,0.08)',
                border: '1px solid rgba(124,58,237,0.25)',
                borderRadius: layout.rMd,
                padding: 'clamp(16px, 2vw, 24px)',
              }}>
                <p style={{
                  margin: '0 0 12px',
                  fontFamily: font.family,
                  fontSize: type.caption.size,
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: color.primary,
                }}>
                  개선 후
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {c.after.map((a, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ color: color.primary, fontWeight: 700, flexShrink: 0, lineHeight: 1.6 }}>✓</span>
                      <span style={{ fontFamily: font.family, fontSize: type.body.size, color: color.ink, lineHeight: 1.6 }}>
                        {a}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {c.tags.map((tag, i) => (
                <span key={i} style={{
                  background: 'rgba(124,58,237,0.15)',
                  color: color.primaryLight,
                  fontFamily: font.family,
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '4px 14px',
                  borderRadius: 999,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
