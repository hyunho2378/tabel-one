import { useReveal } from '../lib/useReveal.js';
import { color, font, type } from '../tokens/web.js';

export default function QuoteCard({ quote, source, align = 'left' }) {
  const [ref, visible] = useReveal({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      style={{
        borderLeft: '3px solid #7C3AED',
        background: 'rgba(124,58,237,0.08)',
        borderRadius: '0 8px 8px 0',
        padding: '20px 24px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-16px)',
        transition: 'opacity 0.55s ease, transform 0.55s ease',
        textAlign: align,
      }}
    >
      <p style={{
        margin: 0,
        fontFamily: font.family,
        fontSize: type.lead.size,
        fontWeight: type.lead.weight,
        lineHeight: type.lead.lh,
        fontStyle: 'italic',
        color: color.ink,
      }}>
        "{quote}"
      </p>
      {source && (
        <p style={{
          margin: '12px 0 0',
          fontFamily: font.family,
          fontSize: type.caption.size,
          color: color.inkMuted,
          textAlign: 'right',
          fontStyle: 'normal',
        }}>
          — {source}
        </p>
      )}
    </div>
  );
}
