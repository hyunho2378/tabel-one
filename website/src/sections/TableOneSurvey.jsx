import { color, font, type, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useCountUp } from '../lib/useCountUp.js';
import SectionHeader from '../components/SectionHeader.jsx';
import QuoteCard from '../components/QuoteCard.jsx';
import researchData from '../data/userResearch.json';

const { survey } = researchData;
const q7  = survey.q7_painPoint;
const q12 = survey.q12_appUsefulness;

function parsePct(str) {
  const m = String(str).match(/(\d+)%/);
  return m ? parseInt(m[1]) : 0;
}

// Animated pair — hooks must live in a component
function AnimatedPair({ left, right }) {
  const [lRef, lVal] = useCountUp(left.num);
  const [rRef, rVal] = useCountUp(right.num);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 16 }}>
      <div ref={lRef} style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: font.family,
          fontSize: 'clamp(28px,3vw,44px)',
          fontWeight: 800,
          lineHeight: 1,
          color: color.primary,
        }}>
          {lVal}{left.unit}
        </div>
        <div style={{ marginTop: 4, fontFamily: font.family, fontSize: type.caption.size, fontWeight: type.caption.weight, color: color.inkMuted }}>
          {left.label}
        </div>
      </div>

      <div style={{
        fontFamily: font.family,
        fontSize: 'clamp(20px,2vw,28px)',
        fontWeight: 500,
        color: color.inkFaint,
        paddingBottom: 20,
      }}>
        /
      </div>

      <div ref={rRef} style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: font.family,
          fontSize: 'clamp(28px,3vw,44px)',
          fontWeight: 800,
          lineHeight: 1,
          color: color.primaryLight,
        }}>
          {rVal}{right.unit}
        </div>
        <div style={{ marginTop: 4, fontFamily: font.family, fontSize: type.caption.size, fontWeight: type.caption.weight, color: color.inkMuted }}>
          {right.label}
        </div>
      </div>
    </div>
  );
}

const CARD = {
  flex: '1 1 240px',
  background: 'rgba(124,58,237,0.06)',
  border: '1px solid rgba(124,58,237,0.15)',
  borderRadius: layout.rLg,
  padding: 'clamp(16px, 2vw, 24px)',
};

const EYEBROW = {
  margin: '0 0 16px',
  fontFamily: font.family,
  fontSize: type.caption.size,
  fontWeight: 800,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: color.primary,
};

export default function TableOneSurvey() {
  const [metricsRef, metricsVisible] = useReveal({ threshold: 0.05 });
  const [insightRef, insightVisible] = useReveal({ threshold: 0.05 });
  const [diffRef,    diffVisible]    = useReveal({ threshold: 0.05 });

  const reveal = (visible) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.6s ease, transform 0.6s ease',
  });

  return (
    <section id="survey" style={{
      background: color.bg,
      paddingTop:    layout.sectionY,
      paddingBottom: layout.sectionY,
      paddingLeft:   layout.gut,
      paddingRight:  layout.gut,
    }}>
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>

        {/* Item 1 — 응답자 구성 한 줄 (sub에 포함) */}
        <SectionHeader
          label="QUANTITATIVE SURVEY"
          title="설문조사 결과"
          sub={`응답자 ${survey.meta.total}명 (한국인 ${survey.meta.korean}, 외국인 ${survey.meta.international}), ${survey.meta.period}`}
        />

        {/* Items 2+3 — 핵심 수치 카드 */}
        <div
          ref={metricsRef}
          style={{
            display: 'flex',
            gap: 'clamp(16px,2vw,24px)',
            flexWrap: 'wrap',
            marginBottom: 'clamp(17px,2.1vw,29px)',
            ...reveal(metricsVisible),
          }}
        >
          {/* Card A — 공통 1위 불편함 */}
          <div style={CARD}>
            <p style={EYEBROW}>공통 1위 불편함: 타인의 시선</p>
            <AnimatedPair
              left={{  num: parsePct(q7.korean[1].pct),        unit: '%', label: '한국인' }}
              right={{ num: parsePct(q7.international[0].pct), unit: '%', label: '외국인' }}
            />
            <p style={{ margin: 0, fontFamily: font.family, fontSize: type.body.size, fontWeight: type.body.weight, lineHeight: type.body.lh, color: color.inkMuted }}>
              두 그룹 모두 혼밥 1순위 불편함이며, 설계가 바뀌면 해소 가능한 문제입니다.
            </p>
          </div>

          {/* Card B — 혼밥 서비스 필요성 */}
          <div style={CARD}>
            <p style={EYEBROW}>혼밥 서비스 필요성 평균</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 16 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: font.family, fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, lineHeight: 1, color: color.primary }}>
                  {q12.korean.avg}점
                </div>
                <div style={{ marginTop: 4, fontFamily: font.family, fontSize: type.caption.size, fontWeight: type.caption.weight, color: color.inkMuted }}>
                  한국인
                </div>
              </div>
              <div style={{ fontFamily: font.family, fontSize: 'clamp(20px,2vw,28px)', fontWeight: 500, color: color.inkFaint, paddingBottom: 20 }}>
                /
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: font.family, fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, lineHeight: 1, color: color.primaryLight }}>
                  {q12.international.avg}점
                </div>
                <div style={{ marginTop: 4, fontFamily: font.family, fontSize: type.caption.size, fontWeight: type.caption.weight, color: color.inkMuted }}>
                  외국인
                </div>
              </div>
            </div>
            <p style={{ margin: 0, fontFamily: font.family, fontSize: type.body.size, fontWeight: type.body.weight, lineHeight: type.body.lh, color: color.inkMuted }}>
              5점 만점으로 두 그룹 모두 3.5점 이상입니다. 명확한 수요 신호입니다.
            </p>
          </div>
        </div>

        {/* Item 4 — 시선 공통 메시지 */}
        <div
          ref={insightRef}
          style={{
            marginBottom: 'clamp(17px,2.1vw,29px)',
            ...reveal(insightVisible),
          }}
        >
          <QuoteCard quote={q7.insight} />
        </div>

        {/* Item 5 — 불편 종류 대비 */}
        <div
          ref={diffRef}
          className="t1-grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(16px,2vw,24px)',
            ...reveal(diffVisible),
          }}
        >
          <div style={{
            background: 'rgba(124,58,237,0.06)',
            border: '1px solid rgba(124,58,237,0.15)',
            borderRadius: layout.rLg,
            padding: 'clamp(16px,2vw,24px)',
          }}>
            <p style={{ ...EYEBROW, marginBottom: 12 }}>두 그룹의 공통점</p>
            <p style={{ margin: '0 0 8px', fontFamily: font.family, fontSize: type.h3.size, fontWeight: type.h3.weight, lineHeight: type.h3.lh, color: color.ink }}>
              타인의 시선
            </p>
            <p style={{ margin: 0, fontFamily: font.family, fontSize: type.body.size, fontWeight: type.body.weight, lineHeight: type.body.lh, color: color.inkMuted }}>
              한국인 {q7.korean[1].pct}, 외국인 {q7.international[0].pct}. 국적에 관계없이 공통 1순위입니다.
            </p>
          </div>

          <div style={{
            background: 'rgba(245,158,11,0.06)',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: layout.rLg,
            padding: 'clamp(16px,2vw,24px)',
          }}>
            <p style={{ ...EYEBROW, color: color.warn, marginBottom: 12 }}>두 그룹의 차이점</p>
            <p style={{ margin: '0 0 8px', fontFamily: font.family, fontSize: type.h3.size, fontWeight: type.h3.weight, lineHeight: type.h3.lh, color: color.ink }}>
              언어 장벽
            </p>
            <p style={{ margin: 0, fontFamily: font.family, fontSize: type.body.size, fontWeight: type.body.weight, lineHeight: type.body.lh, color: color.inkMuted }}>
              외국인 {q7.international[1].pct} vs 한국인 {q7.korean[6].pct}, 불편의 종류 자체가 다릅니다.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
