import { useReveal } from '../lib/useReveal.js';
import { color, font, type, layout } from '../tokens/web.js';
import data from '../data/tableOne.json';

const { hero } = data;

export default function TableOneHero() {
  const [ref, visible] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        minHeight: 'clamp(600px, 85vh, 900px)',
        background: color.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: `${layout.sectionY} ${layout.gut}`,
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes t1-bounce {
          0%, 100% { transform: translate(-50%, 0); }
          50%       { transform: translate(-50%, 10px); }
        }
      `}</style>

      {/* z-index 0: background image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
      }} />

      {/* z-index 1: gradient overlay — left darker for text contrast */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.72) 55%, rgba(13,13,13,0.45) 100%)',
        zIndex: 1,
      }} />

      {/* z-index 2: content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'left',
        width: '100%',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(-12px)',
        transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
      }}>
        <h1 style={{
          margin: '0 0 24px',
          fontFamily: font.family,
          fontWeight: 800,
          lineHeight: 1.12,
          letterSpacing: '-0.04em',
          color: color.ink,
          wordBreak: 'keep-all',
        }}>
          {hero.headline.split('\n').map((line, i, arr) => (
            <span key={i} style={{
              display: 'block',
              fontSize: i === 0 ? type.display.size : type.h1.size,
              lineHeight: i === 0 ? 1.1 : 1.3,
              marginBottom: i < arr.length - 1 ? 6 : 0,
            }}>
              {line}
            </span>
          ))}
        </h1>
        <p style={{
          margin: '0 0 32px',
          fontFamily: font.family,
          fontSize: type.lead.size,
          fontWeight: type.lead.weight,
          lineHeight: type.lead.lh,
          color: color.inkMuted,
          wordBreak: 'keep-all',
        }}>
          {hero.subheadline}
        </p>
        <a
          href="https://tabel-one-cx-consulting.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            textDecoration: 'none',
            background: color.primary,
            color: '#fff',
            fontFamily: font.family,
            fontSize: type.lead.size,
            fontWeight: 700,
            padding: 'clamp(14px, 1.5vw, 18px) clamp(28px, 3vw, 40px)',
            borderRadius: 999,
          }}
        >
          CX 컨설팅 서비스 보기
        </a>
      </div>

      {/* Scroll arrow */}
      <div style={{
        position: 'absolute',
        bottom: 36,
        left: '50%',
        zIndex: 2,
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
