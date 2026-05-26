import { useReveal } from '../lib/useReveal.js';
import { color, font, type, layout } from '../tokens/web.js';
import tableData from '../data/tableOne.json';

const { meta } = tableData;

export default function TableOneOutro() {
  const [ref, visible] = useReveal({ threshold: 0.15 });

  return (
    <section id="outro" style={{
      background: color.bg,
      padding: `${layout.sectionY} ${layout.gut}`,
      maxWidth: layout.container,
      margin: '0 auto',
      boxSizing: 'border-box',
      minHeight: 'clamp(320px, 40vh, 480px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}>
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          maxWidth: 760,
        }}
      >
        {/* Eyebrow */}
        <p style={{
          margin: '0 0 24px',
          fontFamily: font.family,
          fontSize: type.caption.size,
          fontWeight: 800,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: color.primary,
        }}>
          TABLE ONE · {meta.course}
        </p>

        {/* Core value */}
        <p style={{
          margin: '0 0 20px',
          fontFamily: font.family,
          fontSize: 'clamp(22px, 3vw, 48px)',
          fontWeight: 800,
          color: color.ink,
          lineHeight: 1.25,
          letterSpacing: '-0.03em',
          wordBreak: 'keep-all',
        }}>
          "Nothing is reduced simply because you are alone"
        </p>

        {/* Divider */}
        <div style={{
          width: 48,
          height: 2,
          background: color.primary,
          borderRadius: 99,
          margin: '28px auto',
          opacity: 0.7,
        }} />

        {/* Sub text */}
        <p style={{
          margin: '0 0 40px',
          fontFamily: font.family,
          fontSize: type.lead.size,
          fontWeight: type.lead.weight,
          color: color.inkMuted,
          lineHeight: type.lead.lh,
          wordBreak: 'keep-all',
        }}>
          혼자라는 이유로 어떤 것도 줄어들지 않도록.<br />
          Table One은 공간과 경험을 재설계합니다.
        </p>

        {/* Team info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          alignItems: 'center',
        }}>
          <p style={{
            margin: 0,
            fontFamily: font.family,
            fontSize: type.body.size,
            fontWeight: type.body.weight,
            color: color.inkFaint,
          }}>
            {meta.team} · {meta.members.join(' / ')}
          </p>
          <p style={{
            margin: 0,
            fontFamily: font.family,
            fontSize: type.body.size,
            fontWeight: type.body.weight,
            color: color.inkFaint,
          }}>
            {meta.period} · {meta.professor}
          </p>
        </div>
      </div>
    </section>
  );
}
