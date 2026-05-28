import { useReveal } from '../lib/useReveal.js';
import { color, font, type, layout } from '../tokens/web.js';
import SectionHeader from '../components/SectionHeader.jsx';
import tableData from '../data/tableOne.json';

const { strategyShift } = tableData;

export default function TableOneStrategyShift() {
  const [pivotRef, pivotVisible] = useReveal({ threshold: 0.1 });
  const [shiftsRef, shiftsVisible] = useReveal({ threshold: 0.1 });
  const [quoteRef, quoteVisible] = useReveal({ threshold: 0.2 });

  return (
    <section id="strategy" style={{
      background: color.bg,
      padding: `${layout.sectionY} ${layout.gut}`,
      maxWidth: layout.container,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      <SectionHeader
        label="STRATEGY SHIFT"
        title="전략 전환"
        sub="리서치가 증명했습니다. 앱만으로는 물리적 장벽을 해결할 수 없습니다."
      />

      {/* Before / After pivot */}
      <div
        ref={pivotRef}
        className="t1-grid-pivot"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: 'clamp(16px, 2vw, 28px)',
          alignItems: 'center',
          marginBottom: 'clamp(24px, 3vw, 44px)',
          opacity: pivotVisible ? 1 : 0,
          transform: pivotVisible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}
      >
        {/* Before */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: layout.rLg,
          padding: 'clamp(24px, 3vw, 40px)',
          textAlign: 'center',
        }}>
          <p style={{
            margin: '0 0 8px',
            fontFamily: font.family,
            fontSize: type.caption.size,
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: color.inkFaint,
          }}>
            BEFORE
          </p>
          <p style={{
            margin: 0,
            fontFamily: font.family,
            fontSize: type.lead.size,
            fontWeight: 600,
            color: color.inkMuted,
            lineHeight: 1.5,
            wordBreak: 'keep-all',
          }}>
            {strategyShift.before}
          </p>
        </div>

        {/* Arrow */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          flexShrink: 0,
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="19" stroke={color.primary} strokeOpacity="0.4" strokeWidth="1" />
            <path d="M14 20h12M22 15l5 5-5 5" stroke={color.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{
            fontFamily: font.family,
            fontSize: type.caption.size,
            color: color.primary,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            PIVOT
          </span>
        </div>

        {/* After */}
        <div style={{
          background: 'rgba(124,58,237,0.06)',
          border: '1px solid rgba(124,58,237,0.15)',
          borderRadius: layout.rLg,
          padding: 'clamp(24px, 3vw, 40px)',
          textAlign: 'center',
        }}>
          <p style={{
            margin: '0 0 8px',
            fontFamily: font.family,
            fontSize: type.caption.size,
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: color.primary,
          }}>
            AFTER
          </p>
          <p style={{
            margin: 0,
            fontFamily: font.family,
            fontSize: type.lead.size,
            fontWeight: 600,
            color: color.ink,
            lineHeight: 1.5,
            wordBreak: 'keep-all',
          }}>
            {strategyShift.after}
          </p>
        </div>
      </div>

      {/* Reason */}
      <div style={{
        background: 'rgba(124,58,237,0.06)',
        border: '1px solid rgba(124,58,237,0.15)',
        borderRadius: layout.rMd,
        padding: 'clamp(16px, 2vw, 24px)',
        marginBottom: 'clamp(40px, 5vw, 72px)',
        opacity: pivotVisible ? 1 : 0,
        transform: pivotVisible ? 'none' : 'translateX(-16px)',
        transition: 'opacity 0.65s ease 0.15s, transform 0.65s ease 0.15s',
      }}>
        <p style={{
          margin: '0 0 6px',
          fontFamily: font.family,
          fontSize: type.caption.size,
          fontWeight: 800,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: color.primary,
        }}>
          WHY
        </p>
        <p style={{
          margin: 0,
          fontFamily: font.family,
          fontSize: type.lead.size,
          fontWeight: type.lead.weight,
          color: color.ink,
          lineHeight: type.lead.lh,
          wordBreak: 'keep-all',
        }}>
          {strategyShift.reason}
        </p>
      </div>

      {/* 4 shifts */}
      <div
        ref={shiftsRef}
        className="t1-grid-2"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(12px, 1.5vw, 20px)',
          marginBottom: 'clamp(24px, 3vw, 44px)',
        }}
      >
        {strategyShift.shifts.map((shift, i) => (
          <div
            key={shift.title}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: layout.rMd,
              padding: 'clamp(20px, 2.5vw, 32px)',
              opacity: shiftsVisible ? 1 : 0,
              transform: shiftsVisible ? 'none' : 'translateY(16px)',
              transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
            }}
          >
            <div style={{
              fontFamily: font.family,
              fontSize: 'clamp(20px, 2.4vw, 36px)',
              fontWeight: 800,
              color: color.primary,
              lineHeight: 1,
              marginBottom: 12,
              opacity: 0.5,
            }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <p style={{
              margin: '0 0 8px',
              fontFamily: font.family,
              fontSize: type.h3.size,
              fontWeight: 700,
              color: color.ink,
              lineHeight: type.h3.lh,
              wordBreak: 'keep-all',
            }}>
              {shift.title}
            </p>
            <p style={{
              margin: 0,
              fontFamily: font.family,
              fontSize: type.body.size,
              fontWeight: type.body.weight,
              color: color.inkMuted,
              lineHeight: 1.7,
              wordBreak: 'keep-all',
            }}>
              {shift.desc}
            </p>
          </div>
        ))}
      </div>

      {/* CX Value quote */}
      <div
        ref={quoteRef}
        style={{
          textAlign: 'center',
          opacity: quoteVisible ? 1 : 0,
          transform: quoteVisible ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}
      >
        <p style={{
          margin: '0 0 10px',
          fontFamily: font.family,
          fontSize: type.caption.size,
          fontWeight: 800,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: color.inkFaint,
        }}>
          CX CORE VALUE
        </p>
        <p style={{
          margin: 0,
          fontFamily: font.family,
          fontSize: type.h2.size,
          fontWeight: type.h2.weight,
          color: color.primary,
          lineHeight: type.h2.lh,
          letterSpacing: type.h2.ls,
        }}>
          "{strategyShift.cxValue}"
        </p>
      </div>
    </section>
  );
}
