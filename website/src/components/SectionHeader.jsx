import { color, font, type } from '../tokens/web.js';

export default function SectionHeader({ label, title, sub, align = 'left' }) {
  return (
    <div style={{ textAlign: align, paddingBottom: 'clamp(20px, 2.4vw, 34px)' }}>
      {label && (
        <p style={{
          margin: '0 0 12px',
          fontFamily: font.family,
          fontSize: type.eyebrow.size,
          fontWeight: type.eyebrow.weight,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: color.primaryLight,
        }}>
          {label}
        </p>
      )}
      <h2 style={{
        margin: sub ? '0 0 16px' : 0,
        fontFamily: font.family,
        fontSize: type.h1.size,
        fontWeight: type.h1.weight,
        lineHeight: type.h1.lh,
        letterSpacing: type.h1.ls,
        color: color.ink,
        wordBreak: 'keep-all',
      }}>
        {title}
      </h2>
      {sub && (
        <p style={{
          margin: 0,
          fontFamily: font.family,
          fontSize: type.lead.size,
          fontWeight: type.lead.weight,
          lineHeight: type.lead.lh,
          color: color.inkMuted,
        }}>
          {sub}
        </p>
      )}
    </div>
  );
}
