import { useState } from 'react';
import { Languages } from 'lucide-react';
import { color, font, layout } from '../tokens/web.js';

export default function ConsultingNav({ data, lang, onLangChange }) {
  const { nav } = data;
  const [open, setOpen] = useState(false);
  const [toggleHover, setToggleHover] = useState(false);

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      background: color.bgAlpha,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${color.line}`,
      fontFamily: font.family,
    }}>
      <div style={{
        maxWidth: layout.container,
        margin: '0 auto',
        padding: `0 ${layout.gut}`,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}>
        {/* Logo */}
        <a href="#hero" style={{
          textDecoration: 'none',
          flexShrink: 0,
          fontFamily: font.family,
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: color.primary,
        }}>
          {nav.logo}
        </a>

        {/* Desktop links */}
        <ul className="cx-nav-links" style={{
          display: 'flex',
          gap: 'clamp(10px, 1.8vw, 28px)',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          flexWrap: 'nowrap',
          overflow: 'hidden',
        }}>
          {nav.links.map(({ label, anchor }) => (
            <li key={anchor}>
              <a
                href={anchor}
                style={{
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 500,
                  color: color.inkMuted,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.18s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = color.primaryLight)}
                onMouseLeave={e => (e.currentTarget.style.color = color.inkMuted)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {/* Language toggle — always visible */}
          <div
            onMouseEnter={() => setToggleHover(true)}
            onMouseLeave={() => setToggleHover(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              background: 'rgba(255,255,255,0.07)',
              borderRadius: 999,
              padding: '2px 2px 2px 8px',
            }}
          >
            <Languages
              size={16}
              color={toggleHover ? color.primaryLight : color.inkMuted}
              style={{ flexShrink: 0, transition: 'color 0.2s' }}
            />
            {['ko', 'en'].map(l => (
              <button
                key={l}
                onClick={() => onLangChange(l)}
                style={{
                  background: lang === l ? color.primary : 'transparent',
                  color: lang === l ? '#fff' : color.inkMuted,
                  border: 'none',
                  borderRadius: 999,
                  fontFamily: font.family,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {l === 'ko' ? 'KO' : 'EN'}
              </button>
            ))}
          </div>

          {/* CTA button */}
          <a
            href="#cta"
            className="cx-nav-links"
            style={{
              textDecoration: 'none',
              background: color.primary,
              color: color.ink,
              fontFamily: font.family,
              fontSize: 13,
              fontWeight: 700,
              padding: '9px 20px',
              borderRadius: 999,
              whiteSpace: 'nowrap',
            }}
          >
            {nav.ctaLabel}
          </a>

          {/* Hamburger */}
          <button
            className="cx-hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label="메뉴"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
              color: color.ink,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {open ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <>
                  <line x1="2" y1="5" x2="18" y2="5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="2" y1="15" x2="18" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          background: color.bgAlpha,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: `1px solid ${color.line}`,
          padding: `12px ${layout.gut} 16px`,
        }}>
          {nav.links.map(({ label, anchor }) => (
            <a
              key={anchor}
              href={anchor}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '10px 0',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                color: color.inkMuted,
                borderBottom: `1px solid ${color.line}`,
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setOpen(false)}
            style={{
              display: 'block',
              paddingTop: 12,
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 700,
              color: color.primary,
            }}
          >
            {nav.ctaLabel}
          </a>
        </div>
      )}
    </nav>
  );
}
