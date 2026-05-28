import { color, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import QuoteCard from '../components/QuoteCard.jsx';
import researchData from '../data/userResearch.json';

const { interview } = researchData;

// 자리·시선 관련 발화만 선별 — JSON keyBehaviors 인덱스 직접 참조
const QUOTES = [
  {
    text:   interview.koreanParticipants[0].keyBehaviors[2],
    source: '한국인 참여자 A',
  },
  {
    text:   interview.koreanParticipants[1].keyBehaviors[1],
    source: '한국인 참여자 B',
  },
  {
    text:   interview.internationalParticipants[0].keyBehaviors[0],
    source: '외국인 참여자 C',
  },
  {
    text:   interview.internationalParticipants[1].keyBehaviors[0],
    source: '외국인 참여자 D',
  },
];

export default function TableOneIDI() {
  const [listRef, listVisible] = useReveal({ threshold: 0.05 });

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
        title="심층 인터뷰"
        sub="총 4명 (한국인 2, 외국인 2), 15~20분 행동 기반 질문으로 진행했습니다."
      />

      <div
        ref={listRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(12px,1.5vw,20px)',
        }}
      >
        {QUOTES.map((item, i) => (
          <div
            key={i}
            style={{
              opacity:    listVisible ? 1 : 0,
              transform:  listVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s`,
            }}
          >
            <QuoteCard quote={item.text} source={item.source} />
          </div>
        ))}
      </div>
    </section>
  );
}
