import { color, font, type, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useCountUp } from '../lib/useCountUp.js';
import data from '../data/consulting.json';

const { hero } = data;

function StatItem({ stat }) {
  const [ref, count] = useCountUp(stat.value);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: 'clamp(20px, 2.5vw, 32px)' }}>
      <div style={{
        fontFamily: font.family,
        fontSize: 'clamp(28px, 3.5vw, 52px)',
        fontWeight: 800,
        color: color.primary,
        lineHeight: 1,
        letterSpacing: '-0.03em',
        marginBottom: 8,
      }}>
        {count}
        <span style={{ fontSize: '0.55em', marginLeft: 2 }}>{stat.unit}</span>
      </div>
      <div style={{
        fontFamily: font.family,
        fontSize: type.lead.size,
        fontWeight: 600,
        color: color.ink,
        marginBottom: 4,
      }}>
        {stat.label}
      </div>
      <div style={{
        fontFamily: font.family,
        fontSize: type.caption.size,
        color: color.inkMuted,
      }}>
        {stat.sub}
      </div>
    </div>
  );
}

export default function ConsultingHero() {
  const [leftRef, leftVisible] = useReveal({ threshold: 0.05 });

  return (
    <section id="hero" style={{
      background: color.bg,
      minHeight: '100vh',
      paddingTop: 60,
      fontFamily: font.family,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <div style={{
        maxWidth: layout.container,
        margin: '0 auto',
        padding: `clamp(60px, 7vw, 100px) ${layout.gut} clamp(48px, 5vw, 72px)`,
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* 2-col grid */}
        <div
          className="cx-hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '60% 40%',
            gap: 'clamp(40px, 5vw, 80px)',
            alignItems: 'center',
            marginBottom: 'clamp(48px, 6vw, 80px)',
          }}
        >
          {/* Left */}
          <div
            ref={leftRef}
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            {/* Badge */}
            <div style={{
              display: 'inline-block',
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(124,58,237,0.35)',
              color: color.primaryLight,
              fontFamily: font.family,
              fontSize: type.caption.size,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '6px 18px',
              borderRadius: 999,
              marginBottom: 28,
            }}>
              {hero.badge}
            </div>

            {/* Headline — \n → <br /> */}
            <h1 style={{
              margin: '0 0 16px',
              fontFamily: font.family,
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.04em',
              color: color.ink,
              wordBreak: 'keep-all',
            }}>
              {hero.headline.split('\n').map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h1>

            {/* Headline EN */}
            <p style={{
              margin: '0 0 20px',
              fontFamily: font.family,
              fontSize: type.lead.size,
              fontWeight: 500,
              color: color.primaryLight,
              letterSpacing: '-0.01em',
            }}>
              {hero.headlineEn}
            </p>

            {/* Sub — \n → <br /> */}
            <p style={{
              margin: '0 0 36px',
              fontFamily: font.family,
              fontSize: type.lead.size,
              color: color.inkMuted,
              lineHeight: 1.75,
              wordBreak: 'keep-all',
            }}>
              {hero.sub.split('\n').map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a
                href="#cta"
                style={{
                  textDecoration: 'none',
                  background: color.primary,
                  color: color.ink,
                  fontFamily: font.family,
                  fontSize: type.lead.size,
                  fontWeight: 700,
                  padding: 'clamp(14px, 1.5vw, 18px) clamp(28px, 3vw, 40px)',
                  borderRadius: 999,
                }}
              >
                {hero.cta1}
              </a>
              <a
                href="#portfolio"
                style={{
                  textDecoration: 'none',
                  background: 'transparent',
                  color: color.ink,
                  fontFamily: font.family,
                  fontSize: type.lead.size,
                  fontWeight: 600,
                  padding: 'clamp(14px, 1.5vw, 18px) clamp(28px, 3vw, 40px)',
                  borderRadius: 999,
                  border: '1.5px solid rgba(255,255,255,0.3)',
                }}
              >
                {hero.cta2}
              </a>
            </div>
          </div>

          {/* Right — 3D Object placeholder */}
          <div
            className="cx-hero-3d"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* 테이블+파티션 3D 오브제 이미지 삽입 위치 */}
            <div style={{
              width: 'clamp(280px, 32vw, 460px)',
              height: 'clamp(280px, 32vw, 460px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #A78BFA 0%, #7C3AED 45%, #4C1D95 85%, #1A0A3B 100%)',
              opacity: 0.8,
              filter: 'blur(1px)',
            }} />
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${color.line}`,
          borderRadius: layout.rLg,
          overflow: 'hidden',
        }}>
          {hero.stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                borderRight: i < hero.stats.length - 1
                  ? '1px solid rgba(255,255,255,0.08)'
                  : 'none',
              }}
            >
              <StatItem stat={stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
