import { useReveal } from '../lib/useReveal.js';
import { color, font, type, layout } from '../tokens/web.js';
import SectionHeader from '../components/SectionHeader.jsx';
import tableData from '../data/tableOne.json';

const { asIsCJM } = tableData;

const EMOTION_COLOR = {
  positive: '#27AE60',
  yellow:   '#F59E0B',
  red:      '#E5484D',
};

const PERSONA_ACCENT = {
  '김서영': color.primary,
  'Lilia':  color.primaryLight,
};

function EmotionDot({ emotionColor }) {
  return (
    <div style={{
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: EMOTION_COLOR[emotionColor],
      flexShrink: 0,
    }} />
  );
}

function CJMRow({ cjm, visible, delay }) {
  const accent = PERSONA_ACCENT[cjm.persona] ?? color.primary;
  const cols = cjm.stages.length;

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(20px)',
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {/* Persona label */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
      }}>
        <div style={{ width: 3, height: 20, background: accent, borderRadius: 99 }} />
        <span style={{
          fontFamily: font.family,
          fontSize: type.body.size,
          fontWeight: 700,
          color: accent,
        }}>
          {cjm.persona}
        </span>
      </div>

      {/* Stages grid */}
      <div className="t1-cjm-stages" style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 2,
      }}>
        {cjm.stages.map((stage) => (
          <div
            key={stage.name}
            style={{
              background: stage.critical
                ? 'rgba(229,72,77,0.1)'
                : 'rgba(255,255,255,0.03)',
              border: `1px solid ${stage.critical ? 'rgba(229,72,77,0.4)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: layout.rSm,
              padding: 'clamp(10px, 1.2vw, 16px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              position: 'relative',
            }}
          >
            {/* Stage name */}
            <p style={{
              margin: 0,
              fontFamily: font.family,
              fontSize: type.caption.size,
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: stage.critical ? color.warn : color.inkFaint,
            }}>
              {stage.name}
            </p>

            {/* Action */}
            <p style={{
              margin: 0,
              fontFamily: font.family,
              fontSize: type.body.size,
              fontWeight: type.body.weight,
              color: color.ink,
              lineHeight: 1.55,
              wordBreak: 'keep-all',
              flexGrow: 1,
            }}>
              {stage.action}
            </p>

            {/* Emotion */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <EmotionDot emotionColor={stage.emotionColor} />
              <span style={{
                fontFamily: font.family,
                fontSize: type.caption.size,
                color: EMOTION_COLOR[stage.emotionColor],
                fontWeight: 600,
                wordBreak: 'keep-all',
              }}>
                {stage.emotion}
              </span>
            </div>

            {/* Pain */}
            {stage.pain && (
              <div style={{
                background: 'rgba(229,72,77,0.15)',
                borderRadius: 4,
                padding: '4px 8px',
              }}>
                <span style={{
                  fontFamily: font.family,
                  fontSize: type.caption.size,
                  color: color.warn,
                  fontWeight: 600,
                  wordBreak: 'keep-all',
                }}>
                  ⚠ {stage.pain}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TableOneAsIsCJM() {
  const [ref, visible] = useReveal({ threshold: 0.08 });

  return (
    <section id="cjm" style={{
      background: color.bg,
      padding: `${layout.sectionY} ${layout.gut}`,
      maxWidth: layout.container,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      <SectionHeader
        label="AS-IS CJM"
        title="현재 고객 여정 지도"
        sub="두 페르소나의 혼밥 경험을 인지 → 고려 → 입장 → 주문 → 식사 → 퇴장으로 추적했다"
      />

      {/* Legend */}
      <div style={{
        display: 'flex',
        gap: 'clamp(16px, 2vw, 28px)',
        marginBottom: 'clamp(24px, 3vw, 40px)',
        flexWrap: 'wrap',
      }}>
        {[
          { label: '긍정적 감정', color: EMOTION_COLOR.positive },
          { label: '중립/불안',   color: EMOTION_COLOR.yellow },
          { label: '부정적 감정', color: EMOTION_COLOR.red },
        ].map(({ label, color: c }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            <span style={{
              fontFamily: font.family,
              fontSize: type.caption.size,
              fontWeight: type.caption.weight,
              color: color.inkMuted,
            }}>
              {label}
            </span>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(229,72,77,0.4)', border: '1px solid rgba(229,72,77,0.6)' }} />
          <span style={{
            fontFamily: font.family,
            fontSize: type.caption.size,
            color: color.inkMuted,
          }}>
            Critical 단계
          </span>
        </div>
      </div>

      <div
        ref={ref}
        style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 3.5vw, 48px)' }}
      >
        {asIsCJM.map((cjm, i) => (
          <CJMRow key={cjm.persona} cjm={cjm} visible={visible} delay={i * 0.15} />
        ))}
      </div>
    </section>
  );
}
