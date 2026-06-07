import { color, font, type, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
const ICON_CHARS = { search: '⊙', pencil: '✎', rocket: '↗' };

export default function ConsultingCTA({ data }) {
  const { cta, footer } = data;
  const [processRef, processVisible] = useReveal({ threshold: 0.1 });
  const [btnRef, btnVisible] = useReveal({ threshold: 0.2 });

  return (
    <section id="cta" style={{
      background: color.bg,
      padding: `${layout.sectionY} ${layout.gut}`,
      maxWidth: layout.container,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      <SectionHeader
        label={cta.label}
        title={cta.headline}
        sub={cta.sub}
        align="center"
      />

      {/* 3-step process */}
      <div
        ref={processRef}
        className="cx-process"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: 'clamp(29px, 3.6vw, 48px)',
          opacity: processVisible ? 1 : 0,
          transform: processVisible ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}
      >
        {cta.items.flatMap((item, i) => {
          const step = (
            <div key={item.title} style={{ flex: 1, textAlign: 'center', padding: 'clamp(10px, 1.5vw, 19px)' }}>
              <div style={{
                width: 56,
                height: 56,
                background: 'rgba(124,58,237,0.15)',
                border: '1px solid rgba(124,58,237,0.25)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
                color: color.primaryLight,
                fontSize: 24,
                fontWeight: 700,
              }}>
                {ICON_CHARS[item.icon] ?? '◈'}
              </div>
              <h3 style={{
                margin: '0 0 10px',
                fontFamily: font.family,
                fontSize: type.h3.size,
                fontWeight: 700,
                color: color.ink,
              }}>
                {item.title}
              </h3>
              <p style={{
                margin: 0,
                fontFamily: font.family,
                fontSize: type.body.size,
                color: color.inkMuted,
                lineHeight: 1.65,
                wordBreak: 'keep-all',
              }}>
                {item.desc}
              </p>
            </div>
          );

          if (i < cta.items.length - 1) {
            return [step, (
              <div key={`arrow-${i}`} style={{
                flexShrink: 0,
                alignSelf: 'center',
                color: color.primary,
                fontSize: 28,
                opacity: 0.5,
                paddingBottom: 24,
              }}>
                →
              </div>
            )];
          }
          return [step];
        })}
      </div>

      {/* CTA buttons */}
      <div
        ref={btnRef}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 20,
          flexWrap: 'wrap',
          marginBottom: 'clamp(29px, 3.6vw, 48px)',
          opacity: btnVisible ? 1 : 0,
          transform: btnVisible ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}
      >
        <a
          href={`mailto:${cta.contactEmail}`}
          style={{
            textDecoration: 'none',
            background: color.primary,
            color: '#fff',
            fontFamily: font.family,
            fontSize: type.lead.size,
            fontWeight: 700,
            padding: 'clamp(14px, 1.5vw, 20px) clamp(32px, 4vw, 56px)',
            borderRadius: 999,
          }}
        >
          {cta.contactLabel}
        </a>
        <a
          href="https://hyunho2378.github.io/tabel-one/"
          style={{
            textDecoration: 'none',
            background: 'transparent',
            color: color.ink,
            fontFamily: font.family,
            fontSize: type.lead.size,
            fontWeight: 600,
            padding: 'clamp(14px, 1.5vw, 20px) clamp(32px, 4vw, 56px)',
            borderRadius: 999,
            border: '1.5px solid rgba(255,255,255,0.25)',
          }}
        >
          {cta.portfolioLabel}
        </a>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        borderTop: `1px solid ${color.line}`,
        paddingTop: 'clamp(14px, 1.8vw, 24px)',
      }}>
        <p style={{
          margin: '0 0 8px',
          fontFamily: font.family,
          fontSize: type.body.size,
          color: color.inkFaint,
        }}>
          {footer.copy}
        </p>
        <p style={{
          margin: 0,
          fontFamily: font.family,
          fontSize: type.caption.size,
          color: color.inkFaint,
        }}>
          {footer.sub}
        </p>
      </div>
    </section>
  );
}
