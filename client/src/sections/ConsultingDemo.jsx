import { useState } from 'react';
import { color, font, type, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import data from '../data/consulting.json';

const { demo } = data;

// Floor plan reference dimensions (pixels) — SVG viewBox matches these
const PW = 280;
const PH = 212;

const STATUS_BG = {
  occupied:  '#2A2A2A',
  available: 'rgba(124,58,237,0.12)',
  selecting: '#7C3AED',
  confirmed: '#10B981',
};
const STATUS_TEXT = {
  occupied:  'rgba(255,255,255,0.60)',
  available: '#FFFFFF',
  selecting: '#FFFFFF',
  confirmed: '#FFFFFF',
};
const STATUS_BORDER = {
  occupied:  '1px solid rgba(255,255,255,0.06)',
  available: '1px solid rgba(124,58,237,0.45)',
  selecting: '1px solid #7C3AED',
  confirmed: '1px solid #10B981',
};

function FloorPlan({ seats, onSeatClick, interactive, zones, statusLabels, recommended, seatSuffix }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>

      {/* ── SVG background: walls, zones, labels ── */}
      <svg
        viewBox={`0 0 ${PW} ${PH}`}
        width="100%"
        style={{ display: 'block' }}
        aria-hidden="true"
      >
        {/* Room border */}
        <rect x="1" y="1" width={PW - 2} height={PH - 2}
          fill="#161618" stroke="rgba(255,255,255,0.08)" strokeWidth="1" rx="4" />

        {/* Kitchen strip — top-right corner */}
        <rect x="184" y="0" width="96" height="7"
          fill="rgba(255,255,255,0.04)" />
        <text x="228" y="5.8" textAnchor="middle"
          fill="rgba(255,255,255,0.45)" fontSize="6.5" fontWeight="400" letterSpacing="0.8"
          fontFamily={font.family}>
          {zones.kitchen}
        </text>

        {/* 창가 파티션 zone label — above seat row */}
        <text x="82" y="11" textAnchor="middle"
          fill="rgba(255,255,255,0.40)" fontSize="6.5" fontWeight="400" letterSpacing="0.5"
          fontFamily={font.family}>
          {zones.windowSolo}
        </text>

        {/* Partition divider line — below window seats */}
        <line x1="4" y1="73" x2="172" y2="73"
          stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

        {/* 2인석 zone label */}
        <text x="9" y="89" fill="rgba(255,255,255,0.35)" fontSize="6.5" fontWeight="400"
          letterSpacing="0.5" fontFamily={font.family}>
          {zones.twoSeat}
        </text>

        {/* 4인석 zone label */}
        <text x="228" y="109" textAnchor="middle"
          fill="rgba(255,255,255,0.35)" fontSize="6.5" fontWeight="400"
          letterSpacing="0.5" fontFamily={font.family}>
          {zones.fourSeat}
        </text>

        {/* 일반 1인석 zone label */}
        <text x="9" y="160" fill="rgba(255,255,255,0.35)" fontSize="6.5" fontWeight="400"
          letterSpacing="0.5" fontFamily={font.family}>
          {zones.regularSolo}
        </text>

        {/* Entrance indicator — bottom-right dashed */}
        <line x1="172" y1={PH - 1} x2={PW - 1} y2={PH - 1}
          stroke="rgba(255,255,255,0.14)" strokeWidth="2" strokeDasharray="4,3" />
        <text x="226" y={PH - 3} textAnchor="middle"
          fill="rgba(255,255,255,0.40)" fontSize="6.5" fontWeight="400"
          fontFamily={font.family}>
          {zones.entrance}
        </text>
      </svg>

      {/* ── Seat buttons — absolutely positioned using % of PW×PH ── */}
      {seats.map(seat => {
        const isClickable = interactive && seat.status === 'available';
        const isRec = !!seat.recommended && seat.status === 'available';
        return (
          <button
            key={seat.id}
            onClick={() => isClickable && onSeatClick(seat.id)}
            disabled={!isClickable}
            style={{
              position: 'absolute',
              left:   `${seat.x / PW * 100}%`,
              top:    `${seat.y / PH * 100}%`,
              width:  `${seat.w / PW * 100}%`,
              height: `${seat.h / PH * 100}%`,
              background: isRec ? 'rgba(124,58,237,0.22)' : STATUS_BG[seat.status],
              border: isRec ? '2px solid #7C3AED' : STATUS_BORDER[seat.status],
              borderRadius: 6,
              cursor: isClickable ? 'pointer' : 'default',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              padding: '3px 4px',
              boxSizing: 'border-box',
              overflow: 'hidden',
              transition: 'background 0.4s ease, border-color 0.4s ease',
              animation: seat.status === 'selecting' ? 'pulse 1.1s ease-in-out infinite' : 'none',
            }}
          >
            {/* Seat number — bold only here */}
            <span style={{
              fontFamily: font.family,
              fontSize: 'clamp(7px, 0.75vw, 10px)',
              fontWeight: 700,
              color: STATUS_TEXT[seat.status],
              lineHeight: 1,
            }}>
              {seat.label}{seatSuffix}
            </span>

            {/* Recommendation badge — bold; status text — normal weight */}
            {isRec ? (
              <span style={{
                fontFamily: font.family,
                fontSize: 'clamp(6px, 0.58vw, 8px)',
                color: '#A78BFA',
                fontWeight: 700,
                lineHeight: 1,
              }}>
                {recommended}
              </span>
            ) : (
              <span style={{
                fontFamily: font.family,
                fontSize: 'clamp(6px, 0.58vw, 8px)',
                fontWeight: 400,
                color: seat.status === 'available' ? color.primaryLight : STATUS_TEXT[seat.status],
                lineHeight: 1,
              }}>
                {statusLabels[seat.status]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function ConsultingDemo() {
  const [sectionRef, sectionVisible] = useReveal({ threshold: 0.05 });
  const [seats, setSeats] = useState(() => demo.kiosk.seats.map(s => ({ ...s })));
  const [langIdx, setLangIdx] = useState(0);
  const [notification, setNotification] = useState(null);

  const langKey = demo.kiosk.langKeys[langIdx];
  const lang = demo.kiosk.i18n[langKey];
  const koStr = demo.kiosk.i18n.ko;

  function handleSeatClick(id) {
    const seat = seats.find(s => s.id === id);
    if (!seat || seat.status !== 'available') return;

    setSeats(prev => prev.map(s => s.id === id ? { ...s, status: 'selecting' } : s));

    setTimeout(() => {
      setSeats(prev => prev.map(s => s.id === id ? { ...s, status: 'confirmed' } : s));
      const seatNum = demo.kiosk.seats.find(s => s.id === id).label;
      setNotification(demo.dashboard.notification.replace('{n}', seatNum));
      setTimeout(() => setNotification(null), 3000);
    }, 1500);
  }

  return (
    <section
      id="demo"
      ref={sectionRef}
      style={{
        background: '#111111',
        padding: `${layout.sectionY} ${layout.gut}`,
        maxWidth: layout.container,
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      <SectionHeader
        label={demo.label}
        title={demo.headline}
        sub={demo.sub}
      />

      <div
        className="cx-demo-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(20px, 3vw, 40px)',
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}
      >
        {/* ── Left: 손님 키오스크 ── */}
        <div style={{
          background: '#1C1C1E',
          borderRadius: 24,
          padding: 'clamp(20px, 2.5vw, 32px)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          border: `1px solid ${color.line}`,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          <div>
            <p style={{ margin: '0 0 3px', fontFamily: font.family, fontSize: type.h3.size, fontWeight: 700, color: color.ink }}>
              {demo.kiosk.title}
            </p>
            <p style={{ margin: 0, fontFamily: font.family, fontSize: type.body.size, fontWeight: 400, color: color.inkMuted }}>
              {demo.kiosk.sub}
            </p>
          </div>

          {/* Language tabs */}
          <div style={{
            display: 'flex',
            gap: 4,
            background: 'rgba(255,255,255,0.07)',
            borderRadius: 999,
            padding: 4,
          }}>
            {demo.kiosk.languages.map((langLabel, i) => (
              <button
                key={demo.kiosk.langKeys[i]}
                onClick={() => setLangIdx(i)}
                style={{
                  flex: 1,
                  background: langIdx === i ? color.primary : 'transparent',
                  color: langIdx === i ? '#fff' : color.inkMuted,
                  border: 'none',
                  borderRadius: 999,
                  fontFamily: font.family,
                  fontSize: type.caption.size,
                  fontWeight: 600,
                  padding: '7px 8px',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {langLabel}
              </button>
            ))}
          </div>

          {/* Select prompt */}
          <p style={{
            margin: 0,
            fontFamily: font.family,
            fontSize: type.body.size,
            fontWeight: 400,
            color: color.inkMuted,
            textAlign: lang.dir === 'rtl' ? 'right' : 'center',
            direction: lang.dir,
          }}>
            {lang.selectPrompt}
          </p>

          {/* Floor plan — interactive */}
          <FloorPlan
            seats={seats}
            onSeatClick={handleSeatClick}
            interactive={true}
            zones={lang.zones}
            statusLabels={lang.status}
            recommended={lang.recommended}
            seatSuffix={lang.seatSuffix}
          />

          {/* Confirm hint */}
          <p style={{
            margin: 0,
            fontFamily: font.family,
            fontSize: 10,
            fontWeight: 400,
            color: color.inkFaint,
            textAlign: lang.dir === 'rtl' ? 'right' : 'center',
            direction: lang.dir,
          }}>
            {lang.confirmLabel}
          </p>
        </div>

        {/* ── Right: 사장님 대시보드 ── */}
        <div style={{
          background: '#0A0A0A',
          borderRadius: 16,
          padding: 'clamp(20px, 2.5vw, 32px)',
          border: `1px solid ${color.line}`,
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          {/* Notification banner */}
          {notification && (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              background: color.primary,
              color: '#fff',
              fontFamily: font.family,
              fontSize: type.body.size,
              fontWeight: 700,
              padding: '12px 20px',
              textAlign: 'center',
              animation: 'slideDown 0.3s ease',
              zIndex: 10,
            }}>
              🔔 {notification}
            </div>
          )}

          <div style={{ marginTop: notification ? 48 : 0, transition: 'margin-top 0.3s ease' }}>
            <p style={{ margin: '0 0 3px', fontFamily: font.family, fontSize: type.h3.size, fontWeight: 700, color: color.ink }}>
              {demo.dashboard.title}
            </p>
            <p style={{ margin: 0, fontFamily: font.family, fontSize: type.body.size, fontWeight: 400, color: color.inkMuted }}>
              {demo.dashboard.sub}
            </p>
          </div>

          {/* Status legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px' }}>
            {Object.entries(demo.dashboard.statusLabels).map(([key, label]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: STATUS_BG[key] === '#2A2A2A' ? '#444' : STATUS_BG[key],
                }} />
                <span style={{ fontFamily: font.family, fontSize: 10, fontWeight: 400, color: color.inkFaint }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Floor plan — mirrored, non-interactive, always Korean */}
          <FloorPlan
            seats={seats}
            onSeatClick={() => {}}
            interactive={false}
            zones={koStr.zones}
            statusLabels={koStr.status}
            recommended={koStr.recommended}
            seatSuffix={koStr.seatSuffix}
          />
        </div>
      </div>
    </section>
  );
}
