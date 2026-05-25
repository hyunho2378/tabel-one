import { useReveal } from '../lib/useReveal.js';
import { color, font, type, layout } from '../tokens/web.js';
import SectionHeader from '../components/SectionHeader.jsx';
import tableData from '../data/tableOne.json';

const { bmc } = tableData;

function BMCBlock({ label, children, accent = false, style: extraStyle = {} }) {
  return (
    <div style={{
      background: accent ? 'rgba(124,58,237,0.08)' : 'rgba(255,255,255,0.03)',
      border: `1px solid ${accent ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: layout.rMd,
      padding: 'clamp(16px, 2vw, 24px)',
      ...extraStyle,
    }}>
      <p style={{
        margin: '0 0 10px',
        fontFamily: font.family,
        fontSize: type.caption.size,
        fontWeight: 800,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: accent ? color.primary : color.inkFaint,
      }}>
        {label}
      </p>
      {children}
    </div>
  );
}

function BulletList({ items, accentDot = false }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <div style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: accentDot ? color.primary : color.inkFaint,
            marginTop: 6,
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: font.family,
            fontSize: type.body.size,
            color: color.inkMuted,
            lineHeight: 1.65,
            wordBreak: 'keep-all',
          }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function SegmentBadge({ label, value }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <span style={{
        fontFamily: font.family,
        fontSize: type.caption.size,
        fontWeight: 600,
        color: color.inkFaint,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        display: 'block',
        marginBottom: 3,
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: font.family,
        fontSize: type.body.size,
        color: color.ink,
        lineHeight: 1.55,
        wordBreak: 'keep-all',
      }}>
        {value}
      </span>
    </div>
  );
}

export default function TableOneBMC() {
  const [topRef, topVisible] = useReveal({ threshold: 0.08 });
  const [botRef, botVisible] = useReveal({ threshold: 0.1 });

  const fadeIn = (delay) => ({
    opacity: topVisible ? 1 : 0,
    transform: topVisible ? 'none' : 'translateY(16px)',
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  const botFade = (delay) => ({
    opacity: botVisible ? 1 : 0,
    transform: botVisible ? 'none' : 'translateY(16px)',
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <section id="bmc" style={{
      background: '#111111',
      padding: `${layout.sectionY} ${layout.gut}`,
      maxWidth: layout.container,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      <SectionHeader
        label="BUSINESS MODEL CANVAS"
        title="비즈니스 모델"
        sub="B2C + B2B 이중 구조 — 혼밥러의 경험을 개선하면서 식당 사장님에게 지속 수익을 만든다"
      />

      {/* Top 5-column BMC row */}
      <div
        ref={topRef}
        className="t1-grid-5"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1.4fr 1fr 1fr',
          gap: 'clamp(8px, 1vw, 12px)',
          marginBottom: 'clamp(8px, 1vw, 12px)',
        }}
      >
        {/* Key Partners */}
        <div style={fadeIn(0)}>
          <BMCBlock label="Key Partners">
            <BulletList items={bmc.keyPartners} />
          </BMCBlock>
        </div>

        {/* Key Resources */}
        <div style={fadeIn(0.08)}>
          <BMCBlock label="Key Resources">
            <BulletList items={bmc.keyResources} />
          </BMCBlock>
        </div>

        {/* Value Propositions — center, accented */}
        <div style={fadeIn(0.16)}>
          <BMCBlock label="Value Propositions" accent>
            <p style={{
              margin: '0 0 12px',
              fontFamily: font.family,
              fontSize: type.body.size,
              fontStyle: 'italic',
              color: color.primary,
              lineHeight: 1.55,
              wordBreak: 'keep-all',
              fontWeight: 600,
            }}>
              "{bmc.valuePropositions.core}"
            </p>
            <p style={{
              margin: '0 0 6px',
              fontFamily: font.family,
              fontSize: type.caption.size,
              fontWeight: 700,
              color: color.inkFaint,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}>
              B2C
            </p>
            <BulletList items={bmc.valuePropositions.b2c} accentDot />
            <p style={{
              margin: '10px 0 6px',
              fontFamily: font.family,
              fontSize: type.caption.size,
              fontWeight: 700,
              color: color.inkFaint,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}>
              B2B
            </p>
            <BulletList items={bmc.valuePropositions.b2b} accentDot />
          </BMCBlock>
        </div>

        {/* Channels */}
        <div style={fadeIn(0.24)}>
          <BMCBlock label="Channels">
            <BulletList items={bmc.channels} />
          </BMCBlock>
        </div>

        {/* Customer Segments */}
        <div style={fadeIn(0.32)}>
          <BMCBlock label="Customer Segments">
            <SegmentBadge label="Primary" value={bmc.customerSegments.primary} />
            <SegmentBadge label="Extreme" value={bmc.customerSegments.extreme} />
            <SegmentBadge label="B2B" value={bmc.customerSegments.b2b} />
          </BMCBlock>
        </div>
      </div>

      {/* Bottom 2-column: Cost + Revenue */}
      <div
        ref={botRef}
        className="t1-grid-2"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(8px, 1vw, 12px)',
        }}
      >
        {/* Cost Structure */}
        <div style={botFade(0)}>
          <BMCBlock label="Cost Structure">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <p style={{
                  margin: '0 0 6px',
                  fontFamily: font.family,
                  fontSize: type.caption.size,
                  fontWeight: 700,
                  color: color.inkFaint,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  고정비
                </p>
                <BulletList items={bmc.costStructure.fixed} />
              </div>
              <div>
                <p style={{
                  margin: '0 0 6px',
                  fontFamily: font.family,
                  fontSize: type.caption.size,
                  fontWeight: 700,
                  color: color.inkFaint,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  변동비
                </p>
                <BulletList items={bmc.costStructure.variable} />
              </div>
            </div>
          </BMCBlock>
        </div>

        {/* Revenue Streams */}
        <div style={botFade(0.1)}>
          <BMCBlock label="Revenue Streams" accent>
            {[
              { key: 'r1', label: 'R1' },
              { key: 'r2', label: 'R2' },
              { key: 'r3', label: 'R3' },
              { key: 'r4', label: 'R4' },
            ].map(({ key, label }) => (
              <div key={key} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <span style={{
                  fontFamily: font.family,
                  fontSize: type.caption.size,
                  fontWeight: 800,
                  color: color.primary,
                  minWidth: 20,
                  flexShrink: 0,
                  paddingTop: 2,
                }}>
                  {label}
                </span>
                <span style={{
                  fontFamily: font.family,
                  fontSize: type.body.size,
                  color: color.inkMuted,
                  lineHeight: 1.65,
                  wordBreak: 'keep-all',
                }}>
                  {bmc.revenueStreams[key]}
                </span>
              </div>
            ))}
          </BMCBlock>
        </div>
      </div>
    </section>
  );
}
