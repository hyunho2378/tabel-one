import { useReveal } from '../lib/useReveal.js';
import { color, font, type, layout } from '../tokens/web.js';
import SectionHeader from '../components/SectionHeader.jsx';
import researchData from '../data/userResearch.json';

const { safari } = researchData;

const CRITICAL_NO = 3;
const POSITIVE_NO = 7;

const META_ITEMS = [
  { label: '장소',         value: safari.location },
  { label: '참여자 특성',  value: '외국인 교환학생, 채식주의자, 첫 방문, 한국인 재학생과 함께 방문' },
  { label: '관찰 항목',   value: `총 ${safari.findings.length}개 발견 사항` },
];

export default function TableOneServiceSafari() {
  const [cardsRef, cardsVisible] = useReveal({ threshold: 0.08 });

  return (
    <section id="safari" style={{
      background: color.bg,
      padding: `${layout.sectionY} ${layout.gut}`,
      maxWidth: layout.container,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      <SectionHeader
        label="SERVICE SAFARI"
        title="서비스 사파리"
        sub={`춘천 현장을 직접 체험하며 총 ${safari.findings.length}개 발견 사항을 기록했습니다.`}
      />

      {/* Meta info bar */}
      <div style={{
        display: 'flex',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: layout.rMd,
        marginBottom: 'clamp(24px, 3vw, 40px)',
        overflow: 'hidden',
      }}>
        {META_ITEMS.map((item, i) => (
          <div
            key={item.label}
            style={{
              flex: 1,
              padding: 'clamp(14px, 1.5vw, 20px) clamp(16px, 2vw, 28px)',
              borderRight: i < META_ITEMS.length - 1
                ? '1px solid rgba(255,255,255,0.08)'
                : 'none',
            }}
          >
            <p style={{
              margin: '0 0 4px',
              fontFamily: font.family,
              fontSize: type.caption.size,
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: color.primary,
            }}>
              {item.label}
            </p>
            <p style={{
              margin: 0,
              fontFamily: font.family,
              fontSize: type.body.size,
              fontWeight: type.body.weight,
              color: color.ink,
              lineHeight: type.body.lh,
              wordBreak: 'keep-all',
            }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Findings grid: 4 cols × 2 rows */}
      <div
        ref={cardsRef}
        className="t1-grid-4"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(10px, 1.2vw, 16px)',
          marginBottom: 'clamp(32px, 4vw, 56px)',
        }}
      >
        {safari.findings.map((f, i) => {
          const isCritical = f.no === CRITICAL_NO;
          const isPositive = f.no === POSITIVE_NO;
          const borderColor = isCritical
            ? color.warn
            : isPositive
            ? color.ok
            : 'rgba(255,255,255,0.08)';

          return (
            <div
              key={f.no}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${borderColor}`,
                borderRadius: layout.rMd,
                padding: 'clamp(14px, 1.5vw, 20px)',
                display: 'flex',
                flexDirection: 'column',
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? 'none' : 'translateY(16px)',
                transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`,
              }}
            >
              {/* Badge row */}
              <div style={{ height: 24, marginBottom: 10 }}>
                {isCritical && (
                  <span style={{
                    display: 'inline-block',
                    background: color.warn,
                    color: color.ink,
                    fontSize: type.caption.size,
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 999,
                    fontFamily: font.family,
                  }}>
                    CRITICAL
                  </span>
                )}
                {isPositive && (
                  <span style={{
                    display: 'inline-block',
                    background: color.ok,
                    color: color.ink,
                    fontSize: type.caption.size,
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 999,
                    fontFamily: font.family,
                  }}>
                    POSITIVE
                  </span>
                )}
              </div>

              {/* Number */}
              <div style={{
                fontFamily: font.family,
                fontSize: 'clamp(22px, 2.2vw, 32px)',
                fontWeight: 800,
                color: color.primary,
                lineHeight: 1,
                marginBottom: 10,
              }}>
                {String(f.no).padStart(2, '0')}
              </div>

              {/* Observation */}
              <p style={{
                margin: '0 0 8px',
                fontFamily: font.family,
                fontSize: type.body.size,
                fontWeight: 700,
                color: color.ink,
                lineHeight: 1.5,
                wordBreak: 'keep-all',
              }}>
                {f.obs}
              </p>

              {/* Implication */}
              <p style={{
                margin: 0,
                fontFamily: font.family,
                fontSize: type.caption.size,
                fontWeight: type.caption.weight,
                color: color.inkMuted,
                lineHeight: type.caption.lh,
                wordBreak: 'keep-all',
                marginTop: 'auto',
              }}>
                → {f.implication}
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
}
