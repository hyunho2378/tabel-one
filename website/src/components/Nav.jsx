import { useState } from 'react';
import { color, font, layout } from '../tokens/web.js';

const LINKS = [
  { label: '개요',     href: '#overview'  },
  { label: '리서치',   href: '#research'  },
  { label: '설문',     href: '#survey'    },
  { label: 'IDI',      href: '#idi'       },
  { label: '사파리',   href: '#safari'    },
  { label: '어피니티', href: '#affinity'  },
  { label: '페르소나', href: '#persona'   },
  { label: 'CJM',      href: '#cjm'       },
  { label: '인사이트', href: '#insights'  },
  { label: '전략',     href: '#strategy'  },
  { label: 'BMC',      href: '#bmc'       },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: color.bgAlpha,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${color.line}`,
        fontFamily: font.family,
      }}
    >
      <div
        style={{
          maxWidth: layout.container,
          margin: '0 auto',
          padding: `0 ${layout.gut}`,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            textDecoration: 'none',
            flexShrink: 0,
            fontFamily: font.family,
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: color.primary,
          }}
        >
          Table One
        </a>

        {/* Desktop links */}
        <ul
          className="t1-nav-links"
          style={{
            display: 'flex',
            gap: 'clamp(10px, 1.8vw, 28px)',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            flexWrap: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                style={{
                  textDecoration: 'none',
                  fontSize: 12,
                  fontWeight: 500,
                  color: color.inkMuted,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.18s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = color.ink)}
                onMouseLeave={(e) => (e.currentTarget.style.color = color.inkMuted)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger (mobile) */}
        <button
          className="t1-hamburger"
          onClick={() => setOpen(o => !o)}
          aria-label="메뉴"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 6,
            color: color.ink,
            flexShrink: 0,
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

      {/* Mobile dropdown */}
      {open && (
        <div
          className="t1-mobile-menu"
          style={{
            background: color.bgAlpha,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: `1px solid ${color.line}`,
            padding: '12px 24px 16px',
          }}
        >
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
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
        </div>
      )}
    </nav>
  );
}
