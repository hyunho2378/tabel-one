import { color, font, type, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useCountUp } from '../lib/useCountUp.js';
import data from '../data/consulting.json';

const { hero } = data;

function StatItem({ stat }) {
  const [ref, count] = useCountUp(stat.value);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: 'clamp(12px, 1.5vw, 19px)' }}>
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

function SeatMap() {
  return (
    <div style={{
      background: '#0D0D0D',
      border: '1px solid rgba(124,58,237,0.25)',
      borderRadius: 16,
      overflow: 'hidden',
      width: 'clamp(240px, 26vw, 360px)',
      fontFamily: font.family,
    }}>
      {/* Header */}
      <div style={{
        padding: '10px 14px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          1F 홀 · 좌석 배치도
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: color.ok }} />
          <span style={{ fontSize: 10, color: color.ok, fontWeight: 600 }}>실시간</span>
        </div>
      </div>

      {/* SVG floor plan */}
      <svg viewBox="0 0 280 228" width="100%" style={{ display: 'block' }}>

        {/* ── 창가 파티션 1인석 ── */}
        <text x="12" y="14" fill="rgba(255,255,255,0.2)" fontSize="8.5" fontWeight="700" letterSpacing="1.5" fontFamily={font.family}>창가 파티션 1인석</text>
        <line x1="12" y1="19" x2="268" y2="19" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

        {/* W1 occupied */}
        <rect x="12" y="24" width="40" height="44" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <circle cx="32" cy="41" r="3.5" fill="rgba(255,255,255,0.12)" />
        <text x="32" y="62" textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize="8" fontFamily={font.family}>1</text>

        {/* W2 available */}
        <rect x="65" y="24" width="40" height="44" rx="6" fill="rgba(124,58,237,0.07)" stroke="rgba(124,58,237,0.38)" strokeWidth="1" />
        <text x="85" y="62" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily={font.family}>2</text>

        {/* W3 RECOMMENDED */}
        <rect x="118" y="22" width="44" height="48" rx="7" fill="rgba(124,58,237,0.2)" stroke="#7C3AED" strokeWidth="2" />
        <text x="140" y="43" textAnchor="middle" fill="#A78BFA" fontSize="8.5" fontWeight="700" fontFamily={font.family}>추천</text>
        <text x="140" y="57" textAnchor="middle" fill="#7C3AED" fontSize="12" fontWeight="800" fontFamily={font.family}>★ 3</text>

        {/* W4 available */}
        <rect x="175" y="24" width="40" height="44" rx="6" fill="rgba(124,58,237,0.07)" stroke="rgba(124,58,237,0.38)" strokeWidth="1" />
        <text x="195" y="62" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily={font.family}>4</text>

        {/* W5 occupied */}
        <rect x="228" y="24" width="40" height="44" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <circle cx="248" cy="41" r="3.5" fill="rgba(255,255,255,0.12)" />
        <text x="248" y="62" textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize="8" fontFamily={font.family}>5</text>

        {/* ── 구분 ── */}
        <line x1="12" y1="78" x2="268" y2="78" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

        {/* ── 2인석 / 4인석 ── */}
        <text x="12" y="91" fill="rgba(255,255,255,0.2)" fontSize="8.5" fontWeight="700" letterSpacing="1.5" fontFamily={font.family}>2인석</text>
        <text x="146" y="91" fill="rgba(255,255,255,0.2)" fontSize="8.5" fontWeight="700" letterSpacing="1.5" fontFamily={font.family}>4인석</text>

        {/* 2인석 frame + chairs */}
        <rect x="12" y="96" width="114" height="60" rx="8" fill="rgba(124,58,237,0.04)" stroke="rgba(124,58,237,0.18)" strokeWidth="1" />
        <rect x="20" y="104" width="44" height="42" rx="5" fill="rgba(124,58,237,0.09)" stroke="rgba(124,58,237,0.32)" strokeWidth="1" />
        <text x="42" y="129" textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize="8" fontFamily={font.family}>6</text>
        <rect x="70" y="104" width="44" height="42" rx="5" fill="rgba(124,58,237,0.09)" stroke="rgba(124,58,237,0.32)" strokeWidth="1" />
        <text x="92" y="129" textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize="8" fontFamily={font.family}>7</text>

        {/* 4인석 frame + chairs (2×2: top occupied / bottom available+occupied) */}
        <rect x="140" y="96" width="128" height="60" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x="148" y="103" width="50" height="20" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <circle cx="173" cy="113" r="2.5" fill="rgba(255,255,255,0.14)" />
        <rect x="210" y="103" width="50" height="20" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <circle cx="235" cy="113" r="2.5" fill="rgba(255,255,255,0.14)" />
        <rect x="148" y="130" width="50" height="20" rx="4" fill="rgba(124,58,237,0.1)" stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
        <text x="173" y="143" textAnchor="middle" fill="rgba(167,139,250,0.7)" fontSize="8" fontFamily={font.family}>10</text>
        <rect x="210" y="130" width="50" height="20" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <circle cx="235" cy="140" r="2.5" fill="rgba(255,255,255,0.14)" />

        {/* ── 구분 ── */}
        <line x1="12" y1="166" x2="268" y2="166" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

        {/* ── 일반 1인석 · 2인석 ── */}
        <text x="12" y="179" fill="rgba(255,255,255,0.2)" fontSize="8.5" fontWeight="700" letterSpacing="1.5" fontFamily={font.family}>일반 1인석 · 2인석</text>

        {/* F1 available */}
        <rect x="12" y="185" width="40" height="36" rx="6" fill="rgba(124,58,237,0.07)" stroke="rgba(124,58,237,0.38)" strokeWidth="1" />
        <text x="32" y="207" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily={font.family}>11</text>

        {/* F2 occupied */}
        <rect x="59" y="185" width="40" height="36" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <circle cx="79" cy="198" r="3.5" fill="rgba(255,255,255,0.12)" />
        <text x="79" y="214" textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize="8" fontFamily={font.family}>12</text>

        {/* Bottom 2인석 frame + chairs */}
        <rect x="110" y="185" width="158" height="36" rx="6" fill="rgba(124,58,237,0.04)" stroke="rgba(124,58,237,0.18)" strokeWidth="1" />
        <rect x="118" y="193" width="60" height="20" rx="4" fill="rgba(124,58,237,0.09)" stroke="rgba(124,58,237,0.28)" strokeWidth="1" />
        <text x="148" y="207" textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize="8" fontFamily={font.family}>13</text>
        <rect x="200" y="193" width="60" height="20" rx="4" fill="rgba(124,58,237,0.09)" stroke="rgba(124,58,237,0.28)" strokeWidth="1" />
        <text x="230" y="207" textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize="8" fontFamily={font.family}>14</text>
      </svg>

      {/* Legend */}
      <div style={{
        padding: '9px 14px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        gap: 14,
        justifyContent: 'center',
      }}>
        {[
          { bg: '#7C3AED', label: '추천' },
          { bg: 'rgba(124,58,237,0.38)', label: '선택 가능' },
          { bg: 'rgba(255,255,255,0.15)', label: '사용 중' },
        ].map(({ bg, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: bg, flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: font.family }}>{label}</span>
          </div>
        ))}
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
        padding: `${layout.sectionY} ${layout.gut}`,
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* 2-col grid */}
        <div
          className="cx-hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '60% 40%',
            gap: 'clamp(24px, 3vw, 48px)',
            alignItems: 'center',
            marginBottom: 'clamp(29px, 3.6vw, 48px)',
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

            {/* Slogan */}
            <p style={{
              margin: '0 0 12px',
              fontFamily: font.family,
              fontSize: type.lead.size,
              fontWeight: 400,
              color: color.inkMuted,
              lineHeight: 1.5,
            }}>
              {hero.slogan}
            </p>

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

          {/* Right — Seat Map */}
          <div
            className="cx-hero-3d"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SeatMap />
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
