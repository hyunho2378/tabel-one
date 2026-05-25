import { color, font, type, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useCountUp } from '../lib/useCountUp.js';
import SectionHeader from '../components/SectionHeader.jsx';
import BarChart from '../components/BarChart.jsx';
import DonutChart from '../components/DonutChart.jsx';
import QuoteCard from '../components/QuoteCard.jsx';
import researchData from '../data/userResearch.json';

// ─── Module-level data prep ───────────────────────────────────────────────────

function parsePct(str) {
  const m = String(str).match(/(\d+)%/);
  return m ? parseInt(m[1]) : 0;
}

const { survey } = researchData;
const sp = survey.sampleProfile;

const korGenderSegs = Object.entries(sp.korean.gender).map(([label, val]) => ({ label, value: parsePct(val) }));
const intlGenderSegs = Object.entries(sp.international.gender).map(([label, val]) => ({ label, value: parsePct(val) }));

const korAffilList = Object.entries(sp.korean.affiliation).map(([k, v]) => `${k}: ${v}`);
const korLivingList = Object.entries(sp.korean.living).map(([k, v]) => `${k}: ${v}`);
const intlAffilList = Object.entries(sp.international.affiliation).map(([k, v]) => `${k}: ${v}`);
const intlLivingList = Object.entries(sp.international.living).map(([k, v]) => `${k}: ${v}`);
const intlNatList = Object.entries(sp.international.nationality).map(([k, v]) => `${k}: ${v}`);

const q7 = survey.q7_painPoint;
const q7Paired = [
  { label: '타인의 시선',      korean: q7.korean[1].n, international: q7.international[0].n },
  { label: '최소 주문·거부',   korean: q7.korean[2].n, international: q7.international[2].n },
  { label: '1인 메뉴 부족',    korean: q7.korean[3].n, international: q7.international[4].n },
  { label: '어색한 대기',      korean: q7.korean[4].n, international: q7.international[3].n },
  { label: '좌석 확인 어려움', korean: q7.korean[5].n, international: q7.international[5].n },
  { label: '언어 장벽',        korean: q7.korean[6].n, international: q7.international[1].n },
];

const q8KorItems  = survey.q8_avoidance.korean.map(d => ({ label: d.item, value: d.n }));
const q8IntlItems = survey.q8_avoidance.international.map(d => ({ label: d.item, value: d.n }));

const q11 = survey.q11_mostImportantInfo;
const q11Paired = [
  { label: '혼밥 가능 여부 / Solo-friendly', korean: q11.korean[2].n, international: q11.international[0].n },
  { label: '가격 / Price',                   korean: q11.korean[0].n, international: q11.international[1].n },
  { label: '맛 후기 / Taste reviews',        korean: q11.korean[1].n, international: q11.international[2].n },
  { label: '좌석 / 대기 / Seating',          korean: q11.korean[3].n, international: q11.international[3].n },
];

const q15 = survey.q15_openEnded;
const ccItems = survey.curbCutEffect.items;

// ─── Sub-components ───────────────────────────────────────────────────────────

function PercentPairCard({ eyebrow, korNum, korLabel, intlNum, intlLabel, unit, desc }) {
  const [korRef, korValue] = useCountUp(korNum);
  const [intlRef, intlValue] = useCountUp(intlNum);
  const [cardRef, cardVisible] = useReveal({ threshold: 0.3 });

  return (
    <div
      ref={cardRef}
      style={{
        flex: '1 1 240px',
        background: 'rgba(124,58,237,0.06)',
        border: '1px solid rgba(124,58,237,0.15)',
        borderRadius: layout.rLg,
        padding: 24,
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <p style={{
        margin: '0 0 16px',
        fontFamily: font.family,
        fontSize: type.caption.size,
        fontWeight: 800,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: color.primary,
      }}>
        {eyebrow}
      </p>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 16 }}>
        <div ref={korRef} style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: font.family,
            fontSize: 'clamp(28px,3vw,44px)',
            fontWeight: 800,
            lineHeight: 1,
            color: color.primary,
          }}>
            {korValue}{unit}
          </div>
          <div style={{
            marginTop: 4,
            fontFamily: font.family,
            fontSize: type.caption.size,
            color: color.inkMuted,
          }}>
            {korLabel}
          </div>
        </div>

        <div style={{
          fontFamily: font.family,
          fontSize: 'clamp(20px,2vw,28px)',
          fontWeight: 300,
          color: color.inkFaint,
          paddingBottom: 20,
        }}>
          /
        </div>

        <div ref={intlRef} style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: font.family,
            fontSize: 'clamp(28px,3vw,44px)',
            fontWeight: 800,
            lineHeight: 1,
            color: color.primary,
          }}>
            {intlValue}{unit}
          </div>
          <div style={{
            marginTop: 4,
            fontFamily: font.family,
            fontSize: type.caption.size,
            color: color.inkMuted,
          }}>
            {intlLabel}
          </div>
        </div>
      </div>

      <p style={{
        margin: 0,
        fontFamily: font.family,
        fontSize: type.body.size,
        lineHeight: type.body.lh,
        color: color.inkMuted,
      }}>
        {desc}
      </p>
    </div>
  );
}

function AvgGauge({ label, avg, col }) {
  const [ref, visible] = useReveal({ threshold: 0.3 });

  return (
    <div ref={ref} style={{ flex: '1 1 200px' }}>
      <p style={{
        margin: '0 0 8px',
        fontFamily: font.family,
        fontSize: type.caption.size,
        fontWeight: 700,
        color: color.inkMuted,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}>
        {label}
      </p>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
        <span style={{
          fontFamily: font.family,
          fontSize: 'clamp(28px,3vw,44px)',
          fontWeight: 800,
          lineHeight: 1,
          color: col,
        }}>
          {avg}
        </span>
        <span style={{
          fontFamily: font.family,
          fontSize: type.lead.size,
          color: color.inkMuted,
        }}>
          / 5
        </span>
      </div>

      <div style={{
        height: 8,
        borderRadius: 999,
        background: color.line,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: visible ? `${(avg / 5) * 100}%` : '0%',
          background: col,
          borderRadius: 999,
          transition: 'width 0.8s cubic-bezier(.22,.68,0,1.2) 0.1s',
        }} />
      </div>
    </div>
  );
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

const blockStyle = (visible) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? 'translateY(0)' : 'translateY(20px)',
  transition: 'opacity 0.6s ease, transform 0.6s ease',
  marginBottom: 'clamp(48px, 6vw, 80px)',
});

const subsectionLabel = (text) => (
  <p style={{
    margin: '0 0 16px',
    fontFamily: font.family,
    fontSize: type.caption.size,
    fontWeight: 800,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: color.primary,
  }}>
    {text}
  </p>
);

// ─── Main component ───────────────────────────────────────────────────────────

export default function TableOneSurvey() {
  // Block reveal refs
  const [b1Ref, b1Visible] = useReveal({ threshold: 0.05 });
  const [b2Ref, b2Visible] = useReveal({ threshold: 0.05 });
  const [b3Ref, b3Visible] = useReveal({ threshold: 0.05 });
  const [b4Ref, b4Visible] = useReveal({ threshold: 0.05 });
  const [b5Ref, b5Visible] = useReveal({ threshold: 0.05 });
  const [b6Ref, b6Visible] = useReveal({ threshold: 0.05 });
  const [b7Ref, b7Visible] = useReveal({ threshold: 0.05 });
  const [b8Ref, b8Visible] = useReveal({ threshold: 0.05 });

  // Card 2 (static) reveal
  const [staticCardRef, staticCardVisible] = useReveal({ threshold: 0.3 });

  return (
    <section id="survey" style={{
      background: '#111111',
      paddingTop: layout.sectionY,
      paddingBottom: layout.sectionY,
      paddingLeft: layout.gut,
      paddingRight: layout.gut,
    }}>
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <SectionHeader
          label="QUANTITATIVE SURVEY"
          title="설문조사 결과"
          sub="n=64 (한국인 39 + 외국인 25) · 2026.03.30~04.06"
        />

        {/* ── Block 1 — 표본 구성 ─────────────────────────────────────────── */}
        <div ref={b1Ref} style={blockStyle(b1Visible)}>
          {subsectionLabel('표본 구성')}

          <div className="t1-grid-2" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(24px, 3vw, 40px)',
          }}>
            {/* Left: 한국인 */}
            <div>
              <p style={{
                margin: '0 0 20px',
                fontFamily: font.family,
                fontSize: type.h3.size,
                fontWeight: type.h3.weight,
                lineHeight: type.h3.lh,
                letterSpacing: type.h3.ls,
                color: color.ink,
              }}>
                한국인 응답자
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                <DonutChart
                  segments={korGenderSegs}
                  centerValue="39명"
                  centerLabel="한국인"
                  size={160}
                  thickness={24}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <p style={{
                    margin: '0 0 8px',
                    fontFamily: font.family,
                    fontSize: type.caption.size,
                    fontWeight: 700,
                    color: color.inkFaint,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    소속
                  </p>
                  {korAffilList.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      gap: 8,
                      marginBottom: 4,
                      fontFamily: font.family,
                      fontSize: type.body.size,
                      lineHeight: type.body.lh,
                    }}>
                      <span style={{ color: color.inkFaint, minWidth: 6 }}>·</span>
                      <span style={{ color: color.ink }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{
                    margin: '0 0 8px',
                    fontFamily: font.family,
                    fontSize: type.caption.size,
                    fontWeight: 700,
                    color: color.inkFaint,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    거주
                  </p>
                  {korLivingList.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      gap: 8,
                      marginBottom: 4,
                      fontFamily: font.family,
                      fontSize: type.body.size,
                      lineHeight: type.body.lh,
                    }}>
                      <span style={{ color: color.inkFaint, minWidth: 6 }}>·</span>
                      <span style={{ color: color.ink }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: 외국인 */}
            <div>
              <p style={{
                margin: '0 0 20px',
                fontFamily: font.family,
                fontSize: type.h3.size,
                fontWeight: type.h3.weight,
                lineHeight: type.h3.lh,
                letterSpacing: type.h3.ls,
                color: color.ink,
              }}>
                외국인 응답자
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                <DonutChart
                  segments={intlGenderSegs}
                  centerValue="25명"
                  centerLabel="외국인"
                  size={160}
                  thickness={24}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { title: '소속', list: intlAffilList },
                  { title: '거주', list: intlLivingList },
                  { title: '국적', list: intlNatList },
                ].map(({ title, list }) => (
                  <div key={title}>
                    <p style={{
                      margin: '0 0 8px',
                      fontFamily: font.family,
                      fontSize: type.caption.size,
                      fontWeight: 700,
                      color: color.inkFaint,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}>
                      {title}
                    </p>
                    {list.map((item, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        gap: 8,
                        marginBottom: 4,
                        fontFamily: font.family,
                        fontSize: type.body.size,
                        lineHeight: type.body.lh,
                      }}>
                        <span style={{ color: color.inkFaint, minWidth: 6 }}>·</span>
                        <span style={{ color: color.ink }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Block 2 — 핵심 수치 하이라이트 ─────────────────────────────── */}
        <div ref={b2Ref} style={blockStyle(b2Visible)}>
          {subsectionLabel('핵심 수치 하이라이트')}

          <div style={{ display: 'flex', gap: 'clamp(16px,2vw,24px)', flexWrap: 'wrap' }}>
            <PercentPairCard
              eyebrow="공통 1위 불편함"
              korNum={26}
              korLabel="한국인"
              intlNum={28}
              intlLabel="외국인"
              unit="%"
              desc="두 그룹 모두 공통 1위 — 타인의 시선"
            />

            {/* Card 2 — static */}
            <div
              ref={staticCardRef}
              style={{
                flex: '1 1 240px',
                background: 'rgba(124,58,237,0.06)',
                border: '1px solid rgba(124,58,237,0.15)',
                borderRadius: layout.rLg,
                padding: 24,
                opacity: staticCardVisible ? 1 : 0,
                transform: staticCardVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
              }}
            >
              <p style={{
                margin: '0 0 16px',
                fontFamily: font.family,
                fontSize: type.caption.size,
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: color.primary,
              }}>
                앱 필요성 평균
              </p>

              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 16 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: font.family,
                    fontSize: 'clamp(28px,3vw,44px)',
                    fontWeight: 800,
                    lineHeight: 1,
                    color: color.primary,
                  }}>
                    3.51점
                  </div>
                  <div style={{
                    marginTop: 4,
                    fontFamily: font.family,
                    fontSize: type.caption.size,
                    color: color.inkMuted,
                  }}>
                    한국인
                  </div>
                </div>

                <div style={{
                  fontFamily: font.family,
                  fontSize: 'clamp(20px,2vw,28px)',
                  fontWeight: 300,
                  color: color.inkFaint,
                  paddingBottom: 20,
                }}>
                  /
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: font.family,
                    fontSize: 'clamp(28px,3vw,44px)',
                    fontWeight: 800,
                    lineHeight: 1,
                    color: color.primary,
                  }}>
                    3.56점
                  </div>
                  <div style={{
                    marginTop: 4,
                    fontFamily: font.family,
                    fontSize: type.caption.size,
                    color: color.inkMuted,
                  }}>
                    외국인
                  </div>
                </div>
              </div>

              <p style={{
                margin: 0,
                fontFamily: font.family,
                fontSize: type.body.size,
                lineHeight: type.body.lh,
                color: color.inkMuted,
              }}>
                5점 만점 기준, 두 그룹 모두 3.5점 이상
              </p>
            </div>

            <PercentPairCard
              eyebrow="주요 지출 구간 비율"
              korNum={59}
              korLabel="한국인"
              intlNum={48}
              intlLabel="외국인"
              unit="%"
              desc="8천~1.2만원 구간 — 경제 장벽 낮음, CX 장벽 높음"
            />
          </div>
        </div>

        {/* ── Block 3 — Q7 최대 불편함 ────────────────────────────────────── */}
        <div ref={b3Ref} style={blockStyle(b3Visible)}>
          {subsectionLabel(q7.label)}

          <div style={{ marginBottom: 20 }}>
            <QuoteCard quote={q7.insight} />
          </div>

          <div style={{ marginBottom: 20 }}>
            <BarChart items={q7Paired} group="both" />
          </div>

          <div style={{
            background: 'rgba(124,58,237,0.12)',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: layout.rSm,
            padding: '10px 16px',
          }}>
            <span style={{ color: color.primary, fontWeight: 700, fontFamily: font.family, fontSize: type.body.size }}>
              언어 장벽: 한국인 0% vs 외국인 16%
            </span>
            <span style={{ color: color.inkMuted, fontFamily: font.family, fontSize: type.body.size }}>
              {' '}— Extreme User(외국인 유학생) 선정의 핵심 근거
            </span>
          </div>
        </div>

        {/* ── Block 4 — Q8 회피 요인 ──────────────────────────────────────── */}
        <div ref={b4Ref} style={blockStyle(b4Visible)}>
          {subsectionLabel(survey.q8_avoidance.label)}

          <div style={{
            marginBottom: 20,
            fontFamily: font.family,
            fontSize: type.lead.size,
            fontWeight: type.lead.weight,
            lineHeight: type.lead.lh,
            color: color.inkMuted,
          }}>
            {survey.q8_avoidance.insight}
          </div>

          <div className="t1-grid-2" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(24px, 3vw, 40px)',
            marginBottom: 20,
          }}>
            <div>
              <p style={{
                margin: '0 0 12px',
                fontFamily: font.family,
                fontSize: type.body.size,
                fontWeight: 700,
                color: color.primary,
              }}>
                한국인
              </p>
              <BarChart items={q8KorItems} group="korean" />
            </div>
            <div>
              <p style={{
                margin: '0 0 12px',
                fontFamily: font.family,
                fontSize: type.body.size,
                fontWeight: 700,
                color: color.primary,
              }}>
                외국인
              </p>
              <BarChart items={q8IntlItems} group="international" />
            </div>
          </div>

          <div style={{ display: 'inline-block' }}>
            <span style={{
              background: 'rgba(124,58,237,0.15)',
              color: color.primary,
              fontFamily: font.family,
              fontSize: type.body.size,
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: 999,
            }}>
              No English support — 외국인 회피 요인 공동 1위
            </span>
          </div>
        </div>

        {/* ── Block 5 — Q10 불편함 정도 ───────────────────────────────────── */}
        <div ref={b5Ref} style={blockStyle(b5Visible)}>
          {subsectionLabel(survey.q10_discomfort.label)}

          <div style={{ marginBottom: 24 }}>
            <QuoteCard quote={survey.q10_discomfort.insight} />
          </div>

          <div style={{
            display: 'flex',
            gap: 'clamp(32px, 4vw, 56px)',
            flexWrap: 'wrap',
            marginBottom: 16,
          }}>
            <AvgGauge label="한국인 평균" avg={2.3} col={color.primary} />
            <AvgGauge label="외국인 평균" avg={2.7} col={color.primaryLight} />
          </div>

          <p style={{
            margin: 0,
            fontFamily: font.family,
            fontSize: type.caption.size,
            color: color.inkFaint,
          }}>
            1=전혀 불편하지 않음{'  '}5=매우 불편함
          </p>
        </div>

        {/* ── Block 6 — Q11 정보 우선순위 ─────────────────────────────────── */}
        <div ref={b6Ref} style={blockStyle(b6Visible)}>
          {subsectionLabel(q11.label)}

          <div style={{ marginBottom: 24 }}>
            <BarChart items={q11Paired} group="both" />
          </div>

          <QuoteCard quote={q11.insight} />
        </div>

        {/* ── Block 7 — Q15 서술형 응답 ───────────────────────────────────── */}
        <div ref={b7Ref} style={blockStyle(b7Visible)}>
          {subsectionLabel(q15.label)}

          <div className="t1-grid-2" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(24px, 3vw, 40px)',
          }}>
            {/* Left: 한국인 */}
            <div>
              <p style={{
                margin: '0 0 16px',
                fontFamily: font.family,
                fontSize: type.h3.size,
                fontWeight: type.h3.weight,
                lineHeight: type.h3.lh,
                letterSpacing: type.h3.ls,
                color: color.ink,
              }}>
                한국인 응답
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {q15.korean.map((text, i) => (
                  <div key={i}>
                    {(i === 0 || i === 1) && (
                      <div style={{ marginBottom: 6 }}>
                        <span style={{
                          background: color.primary,
                          color: '#fff',
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 999,
                          fontFamily: font.family,
                        }}>
                          자리 선택 자율성
                        </span>
                      </div>
                    )}
                    <QuoteCard quote={text} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: 외국인 */}
            <div>
              <p style={{
                margin: '0 0 16px',
                fontFamily: font.family,
                fontSize: type.h3.size,
                fontWeight: type.h3.weight,
                lineHeight: type.h3.lh,
                letterSpacing: type.h3.ls,
                color: color.ink,
              }}>
                외국인 응답
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {q15.international.map((text, i) => (
                  <QuoteCard key={i} quote={text} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Block 8 — Curb-Cut Effect ────────────────────────────────────── */}
        <div ref={b8Ref} style={blockStyle(b8Visible)}>
          {subsectionLabel(survey.curbCutEffect.label)}

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 2fr 2fr',
            borderRadius: layout.rMd,
            overflow: 'hidden',
            border: `1px solid ${color.line}`,
          }}>
            {/* Header row */}
            {['기능', '외국인 이득', '한국인 이득'].map((col) => (
              <div
                key={col}
                style={{
                  background: color.primary,
                  color: '#ffffff',
                  fontFamily: font.family,
                  fontSize: type.body.size,
                  fontWeight: 700,
                  padding: '12px 16px',
                }}
              >
                {col}
              </div>
            ))}

            {/* Data rows */}
            {ccItems.map((item, i) => {
              const rowBg = i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent';
              const cellStyle = {
                background: rowBg,
                padding: '14px 16px',
                borderBottom: i < ccItems.length - 1 ? `1px solid ${color.line}` : 'none',
                fontFamily: font.family,
                fontSize: type.body.size,
                lineHeight: type.body.lh,
              };
              return [
                <div key={`${i}-f`} style={{ ...cellStyle, color: color.ink }}>{item.feature}</div>,
                <div key={`${i}-i`} style={{ ...cellStyle, color: color.inkMuted }}>{item.intlBenefit}</div>,
                <div key={`${i}-k`} style={{ ...cellStyle, color: color.inkMuted }}>{item.korBenefit}</div>,
              ];
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
