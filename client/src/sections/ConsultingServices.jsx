import { useState } from 'react';
import { color, font, type, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import data from '../data/consulting.json';

const { services } = data;

function ServiceCard({ svc, visible, delay, expanded, onToggle }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(124,58,237,0.08)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? color.primary : 'rgba(255,255,255,0.08)'}`,
        borderRadius: layout.rMd,
        padding: 'clamp(20px, 2.5vw, 32px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s, background 0.2s, border-color 0.2s`,
      }}
    >
      {/* No */}
      <div style={{
        fontFamily: font.family,
        fontSize: type.caption.size,
        fontWeight: 700,
        color: color.primaryLight,
        letterSpacing: '0.12em',
      }}>
        {svc.no}
      </div>

      {/* Name block */}
      <div>
        <h3 style={{
          margin: '0 0 4px',
          fontFamily: font.family,
          fontSize: type.h3.size,
          fontWeight: 800,
          color: color.ink,
          lineHeight: 1.3,
        }}>
          {svc.name}
        </h3>
        <p style={{
          margin: 0,
          fontFamily: font.family,
          fontSize: type.caption.size,
          color: color.inkMuted,
          letterSpacing: '0.04em',
        }}>
          {svc.nameEn}
        </p>
      </div>

      {/* Summary */}
      <p style={{
        margin: 0,
        fontFamily: font.family,
        fontSize: type.lead.size,
        color: color.ink,
        lineHeight: 1.65,
        wordBreak: 'keep-all',
      }}>
        {svc.summary}
      </p>

      {/* Detail (toggle) */}
      {expanded && (
        <p style={{
          margin: 0,
          fontFamily: font.family,
          fontSize: type.body.size,
          color: color.inkMuted,
          lineHeight: 1.78,
          wordBreak: 'keep-all',
        }}>
          {svc.detail}
        </p>
      )}
      <button
        onClick={onToggle}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: font.family,
          fontSize: type.caption.size,
          fontWeight: 600,
          color: color.primaryLight,
          padding: 0,
          textAlign: 'left',
          alignSelf: 'flex-start',
        }}
      >
        {expanded ? '접기 ↑' : '더보기 ↓'}
      </button>

      {/* Deliverables checklist */}
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {svc.deliverables.map((d, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <span style={{ color: color.primary, fontWeight: 700, flexShrink: 0, lineHeight: 1.55 }}>✓</span>
            <span style={{
              fontFamily: font.family,
              fontSize: type.body.size,
              color: color.inkMuted,
              lineHeight: 1.55,
            }}>
              {d}
            </span>
          </li>
        ))}
      </ul>

      {/* painSolved tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {svc.painSolved.split(' / ').map((tag, i) => (
          <span key={i} style={{
            background: 'rgba(124,58,237,0.15)',
            color: color.primaryLight,
            fontFamily: font.family,
            fontSize: 10,
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: 999,
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Curb-cut effect box */}
      <div style={{
        borderLeft: `2px solid ${color.ok}`,
        background: 'rgba(16,185,129,0.06)',
        borderRadius: '0 6px 6px 0',
        padding: '10px 14px',
        marginTop: 'auto',
      }}>
        <p style={{
          margin: '0 0 5px',
          fontFamily: font.family,
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: color.ok,
        }}>
          CURB-CUT EFFECT
        </p>
        <p style={{
          margin: 0,
          fontFamily: font.family,
          fontSize: type.body.size,
          color: color.inkMuted,
          lineHeight: 1.6,
          wordBreak: 'keep-all',
        }}>
          {svc.curbCut}
        </p>
      </div>

      {/* Demo link (kiosk card only) */}
      {svc.hasDemo && (
        <a href="#demo" style={{
          textDecoration: 'none',
          color: color.primary,
          fontFamily: font.family,
          fontSize: type.body.size,
          fontWeight: 700,
        }}>
          라이브 데모 보기 →
        </a>
      )}
    </div>
  );
}

export default function ConsultingServices() {
  const [cardsRef, cardsVisible] = useReveal({ threshold: 0.06 });
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section id="services" style={{
      background: color.bg,
      padding: `${layout.sectionY} ${layout.gut}`,
      maxWidth: layout.container,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      <SectionHeader
        label={services.label}
        title={services.headline}
        sub={services.sub}
      />

      <div
        ref={cardsRef}
        className="cx-grid-3"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(12px, 1.5vw, 20px)',
        }}
      >
        {services.items.map((svc, i) => (
          <ServiceCard
            key={svc.id}
            svc={svc}
            visible={cardsVisible}
            delay={i * 0.1}
            expanded={expandedId === svc.id}
            onToggle={() => setExpandedId(expandedId === svc.id ? null : svc.id)}
          />
        ))}
      </div>
    </section>
  );
}
