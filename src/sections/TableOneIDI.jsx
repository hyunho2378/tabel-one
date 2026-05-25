import { useState } from 'react';
import { useReveal } from '../lib/useReveal.js';
import { color, font, type, layout } from '../tokens/web.js';
import SectionHeader from '../components/SectionHeader.jsx';
import researchData from '../data/userResearch.json';

const { interview } = researchData;

const ALL_PARTICIPANTS = [
  ...interview.koreanParticipants.map(p => ({ ...p, group: 'korean' })),
  ...interview.internationalParticipants.map(p => ({ ...p, group: 'international' })),
];

function shortPattern(pattern) {
  return pattern.split(' (')[0];
}

export default function TableOneIDI() {
  const [activeTab, setActiveTab] = useState('A');
  const [cardsRef, cardsVisible] = useReveal({ threshold: 0.1 });
  const [goldenRef, goldenVisible] = useReveal({ threshold: 0.2 });

  const active = ALL_PARTICIPANTS.find(p => p.id === activeTab);

  return (
    <section id="idi" style={{
      background: color.bg,
      padding: `${layout.sectionY} ${layout.gut}`,
      maxWidth: layout.container,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      <SectionHeader
        label="QUALITATIVE RESEARCH"
        title="심층 인터뷰 IDI"
        sub="n=4 (한국인 2 + 외국인 2) · 15~20분 행동 기반 질문"
      />

      {/* Participant cards 2×2 */}
      <div
        ref={cardsRef}
        className="t1-grid-2"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(12px, 1.5vw, 20px)',
          marginBottom: 'clamp(32px, 4vw, 48px)',
        }}
      >
        {ALL_PARTICIPANTS.map((p, i) => {
          const accentColor = p.group === 'korean' ? color.brand : color.brandSky;
          return (
            <div
              key={p.id}
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: layout.rMd,
                borderLeft: `3px solid ${accentColor}`,
                padding: 'clamp(16px, 2vw, 24px)',
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? 'none' : 'translateY(16px)',
                transition: `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
                <span style={{
                  fontFamily: font.family,
                  fontSize: 'clamp(22px, 2.8vw, 36px)',
                  fontWeight: 800,
                  color: accentColor,
                  lineHeight: 1,
                }}>
                  {p.id}
                </span>
                <span style={{
                  fontFamily: font.family,
                  fontSize: type.caption.size,
                  fontWeight: 700,
                  color: accentColor,
                }}>
                  {p.group === 'korean' ? '한국인' : '외국인'}
                </span>
              </div>
              <p style={{
                margin: 0,
                fontFamily: font.family,
                fontSize: type.body.size,
                fontWeight: 600,
                color: color.ink,
                lineHeight: 1.55,
                wordBreak: 'keep-all',
              }}>
                {p.pattern}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tab + behavior list */}
      <div style={{ marginBottom: 'clamp(32px, 4vw, 56px)' }}>
        {/* Tab bar */}
        <div style={{
          display: 'flex',
          borderBottom: `1px solid ${color.line}`,
          marginBottom: 28,
          gap: 0,
          flexWrap: 'wrap',
        }}>
          {ALL_PARTICIPANTS.map(p => {
            const isActive = activeTab === p.id;
            const accentColor = p.group === 'korean' ? color.brand : color.brandSky;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: `2px solid ${isActive ? accentColor : 'transparent'}`,
                  marginBottom: -1,
                  cursor: 'pointer',
                  padding: '10px clamp(12px, 1.5vw, 20px)',
                  fontFamily: font.family,
                  fontSize: type.body.size,
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? accentColor : color.inkMuted,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
              >
                {p.id} · {shortPattern(p.pattern)}
              </button>
            );
          })}
        </div>

        {/* Behavior list */}
        {active && (
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {active.keyBehaviors.map((behavior, i) => {
              const dotColor = active.group === 'korean' ? color.brand : color.brandSky;
              return (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: dotColor,
                    marginTop: 6,
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: font.family,
                    fontSize: type.lead.size,
                    color: color.ink,
                    lineHeight: 1.65,
                    wordBreak: 'keep-all',
                  }}>
                    {behavior}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Golden Insight banner */}
      <div
        ref={goldenRef}
        style={{
          background: 'rgba(254,73,1,0.08)',
          border: '1px solid rgba(254,73,1,0.3)',
          borderRadius: layout.rLg,
          padding: 'clamp(24px, 3vw, 40px)',
          textAlign: 'center',
          opacity: goldenVisible ? 1 : 0,
          transform: goldenVisible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}
      >
        <p style={{
          margin: '0 0 16px',
          fontFamily: font.family,
          fontSize: type.caption.size,
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: color.brand,
        }}>
          GOLDEN INSIGHT
        </p>
        <p style={{
          margin: '0 auto',
          maxWidth: '740px',
          fontFamily: font.family,
          fontSize: type.lead.size,
          lineHeight: type.lead.lh,
          color: color.ink,
          wordBreak: 'keep-all',
        }}>
          {interview.goldenInsight}
        </p>
      </div>
    </section>
  );
}
