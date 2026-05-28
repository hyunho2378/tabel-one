import { useReveal } from '../lib/useReveal.js';
import { color, font, type, layout } from '../tokens/web.js';
import SectionHeader from '../components/SectionHeader.jsx';
import tableData from '../data/tableOne.json';

const { asIsCJM } = tableData;

// ─── Coordinate mapping ───────────────────────────────────────────────────────
// emotionColor → SVG y (긍정=위, 부정=아래)
const EY = { positive: 62, yellow: 150, red: 230 };

// 6 stages evenly across x [52 .. 600], total SVG width 624
const SX = [0, 1, 2, 3, 4, 5].map(i => 52 + i * 109.6);
// → [52, 161.6, 271.2, 380.8, 490.4, 600]

const STAGE_NAMES = asIsCJM[0].stages.map(s => s.name);

// ─── Color constants ──────────────────────────────────────────────────────────
const EMOTION_COLOR = {
  positive: '#27AE60',
  yellow:   '#F59E0B',
  red:      '#E5484D',
};

// Persona line colors from design token (evaluated after import)
const PERSONA_LINE = {
  '김서영': color.primary,      // #7C3AED
  'Lilia':  color.primaryLight, // #A78BFA
};

// Slight x-offset so overlapping dots stay visible
const X_OFFSET = { 0: -5, 1: 5 }; // index 0 = 김서영, 1 = Lilia

// ─── Main component ───────────────────────────────────────────────────────────
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
        sub="두 페르소나의 혼밥 경험을 인지, 고려, 입장, 주문, 식사, 퇴장 순서로 추적했습니다."
      />

      {/* ── Legend ──────────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        gap: 'clamp(12px, 1.8vw, 24px)',
        marginBottom: 'clamp(20px, 2.5vw, 36px)',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
        {/* Persona lines */}
        {[
          { label: '김서영', col: color.primary },
          { label: 'Lilia',  col: color.primaryLight },
        ].map(({ label, col }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <svg width="28" height="12" style={{ flexShrink: 0, display: 'block' }}>
              <line x1="1" y1="6" x2="27" y2="6" stroke={col} strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="14" cy="6" r="4" fill={col} />
            </svg>
            <span style={{ fontFamily: font.family, fontSize: type.caption.size, fontWeight: 600, color: color.inkMuted }}>
              {label}
            </span>
          </div>
        ))}

        <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />

        {/* Emotion states */}
        {[
          { label: '긍정적 감정', c: EMOTION_COLOR.positive },
          { label: '중립/불안',   c: EMOTION_COLOR.yellow },
          { label: '부정적 감정', c: EMOTION_COLOR.red },
        ].map(({ label, c }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: c, flexShrink: 0 }} />
            <span style={{ fontFamily: font.family, fontSize: type.caption.size, fontWeight: type.caption.weight, color: color.inkMuted }}>
              {label}
            </span>
          </div>
        ))}

        <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />

        {/* Critical indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="18" height="18" style={{ flexShrink: 0, display: 'block' }}>
            <circle cx="9" cy="9" r="8" fill="none" stroke={EMOTION_COLOR.red} strokeWidth="1.5" strokeOpacity="0.6" />
            <circle cx="9" cy="9" r="4.5" fill={EMOTION_COLOR.red} />
          </svg>
          <span style={{ fontFamily: font.family, fontSize: type.caption.size, fontWeight: type.caption.weight, color: color.inkMuted }}>
            Critical 단계 (점 위에 커서를 올리면 상세 내용)
          </span>
        </div>
      </div>

      {/* ── SVG Chart ───────────────────────────────────────────────────────── */}
      <div
        ref={ref}
        style={{
          overflowX: 'auto',
          borderRadius: layout.rMd,
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${color.line}`,
          padding: '20px 8px 12px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.65s ease 0.2s',
        }}
      >
        <svg
          viewBox="0 0 624 300"
          style={{ width: '100%', minWidth: 460, display: 'block' }}
          aria-label="감정 곡선 그래프"
        >
          {/* Horizontal gridlines + y-axis labels */}
          {[
            { y: EY.positive, label: '긍정', c: EMOTION_COLOR.positive },
            { y: EY.yellow,   label: '중립', c: EMOTION_COLOR.yellow },
            { y: EY.red,      label: '부정', c: EMOTION_COLOR.red },
          ].map(({ y, label, c }) => (
            <g key={label}>
              <line
                x1="52" y1={y} x2="612" y2={y}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              <text
                x="46" y={y + 4}
                textAnchor="end"
                fill={c}
                fontSize="9.5"
                fontFamily="Pretendard Variable, Pretendard, sans-serif"
                fontWeight="700"
                opacity="0.9"
              >
                {label}
              </text>
            </g>
          ))}

          {/* Vertical stage separators */}
          {SX.map((x, i) => (
            <line
              key={i}
              x1={x} y1={EY.positive - 22} x2={x} y2={EY.red + 22}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          ))}

          {/* Stage labels (x-axis) */}
          {STAGE_NAMES.map((name, i) => (
            <text
              key={i}
              x={SX[i]} y="286"
              textAnchor="middle"
              fill="rgba(255,255,255,0.6)"
              fontSize="11"
              fontFamily="Pretendard Variable, Pretendard, sans-serif"
              fontWeight="600"
            >
              {name}
            </text>
          ))}

          {/* Emotion curves (polylines) — one per persona with x-offset */}
          {asIsCJM.map((cjm, ci) => {
            const xo = X_OFFSET[ci];
            const pts = cjm.stages
              .map((s, i) => `${SX[i] + xo},${EY[s.emotionColor]}`)
              .join(' ');
            return (
              <polyline
                key={cjm.persona}
                points={pts}
                fill="none"
                stroke={PERSONA_LINE[cjm.persona]}
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity="0.9"
              />
            );
          })}

          {/* Data points */}
          {asIsCJM.map((cjm, ci) => {
            const xo      = X_OFFSET[ci];
            const lineCol = PERSONA_LINE[cjm.persona];
            return cjm.stages.map((stage, i) => {
              const cx = SX[i] + xo;
              const cy = EY[stage.emotionColor];
              const dc = EMOTION_COLOR[stage.emotionColor];
              // Emotion label: 김서영 above, Lilia below
              const lblY = ci === 0 ? cy - 14 : cy + 20;
              const tip  = `${cjm.persona} · ${stage.name}\n${stage.action}${stage.pain ? `\n⚠ ${stage.pain}` : ''}`;

              return (
                <g key={`${cjm.persona}-${i}`}>
                  {/* Critical outer ring */}
                  {stage.critical && (
                    <circle
                      cx={cx} cy={cy} r={13}
                      fill="none"
                      stroke={dc}
                      strokeWidth="1.5"
                      strokeOpacity="0.5"
                    />
                  )}
                  {/* Main dot */}
                  <circle cx={cx} cy={cy} r={6} fill={dc} stroke={lineCol} strokeWidth="1.5">
                    <title>{tip}</title>
                  </circle>
                  {/* Emotion label */}
                  <text
                    x={cx} y={lblY}
                    textAnchor="middle"
                    fill={dc}
                    fontSize="8.5"
                    fontFamily="Pretendard Variable, Pretendard, sans-serif"
                    fontWeight="700"
                    opacity="0.9"
                  >
                    {stage.emotion}
                  </text>
                </g>
              );
            });
          })}
        </svg>
      </div>
    </section>
  );
}
