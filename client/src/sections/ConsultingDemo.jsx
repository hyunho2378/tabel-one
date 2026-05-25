import { useState } from 'react';
import { color, font, type, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import data from '../data/consulting.json';

const { demo } = data;

const STATUS_BG = {
  occupied:  '#2A2A2A',
  available: 'rgba(124,58,237,0.15)',
  selecting: '#7C3AED',
  confirmed: '#10B981',
};
const STATUS_TEXT = {
  occupied:  'rgba(255,255,255,0.28)',
  available: '#FFFFFF',
  selecting: '#FFFFFF',
  confirmed: '#FFFFFF',
};
const STATUS_BORDER = {
  occupied:  '1px solid rgba(255,255,255,0.06)',
  available: '1px solid #7C3AED',
  selecting: '1px solid #7C3AED',
  confirmed: '1px solid #10B981',
};

function SeatButton({ seat, onClick, interactive }) {
  const isClickable = interactive && seat.status === 'available';
  return (
    <button
      onClick={() => isClickable && onClick(seat.id)}
      disabled={!isClickable}
      style={{
        background: STATUS_BG[seat.status],
        border: STATUS_BORDER[seat.status],
        borderRadius: 12,
        padding: 'clamp(10px, 1.2vw, 16px) 4px',
        cursor: isClickable ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        transition: 'background 0.4s ease, border-color 0.4s ease',
        animation: seat.status === 'selecting' ? 'pulse 1.1s ease-in-out infinite' : 'none',
        width: '100%',
      }}
    >
      <span style={{
        fontFamily: font.family,
        fontSize: type.body.size,
        fontWeight: 800,
        color: STATUS_TEXT[seat.status],
        lineHeight: 1,
      }}>
        {seat.label}
      </span>
      <span style={{
        fontFamily: font.family,
        fontSize: 9,
        fontWeight: 500,
        color: seat.status === 'available' ? color.primaryLight : STATUS_TEXT[seat.status],
        opacity: seat.status === 'occupied' ? 0.5 : 1,
      }}>
        {demo.dashboard.statusLabels[seat.status]}
      </span>
    </button>
  );
}

function SeatGrid({ seats, onSeatClick, interactive }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'clamp(6px, 0.8vw, 10px)',
    }}>
      {seats.map(seat => (
        <SeatButton
          key={seat.id}
          seat={seat}
          onClick={onSeatClick}
          interactive={interactive}
        />
      ))}
    </div>
  );
}

export default function ConsultingDemo() {
  const [sectionRef, sectionVisible] = useReveal({ threshold: 0.05 });
  const [seats, setSeats] = useState(() => demo.kiosk.seats.map(s => ({ ...s })));
  const [langIdx, setLangIdx] = useState(0);
  const [notification, setNotification] = useState(null);

  function handleSeatClick(id) {
    const seat = seats.find(s => s.id === id);
    if (!seat || seat.status !== 'available') return;

    setSeats(prev => prev.map(s => s.id === id ? { ...s, status: 'selecting' } : s));

    setTimeout(() => {
      setSeats(prev => prev.map(s => s.id === id ? { ...s, status: 'confirmed' } : s));
      const seatLabel = demo.kiosk.seats.find(s => s.id === id).label;
      setNotification(demo.dashboard.notification.replace(/\d+번/, seatLabel));
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
          border: '1px solid rgba(255,255,255,0.09)',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}>
          <div>
            <p style={{ margin: '0 0 3px', fontFamily: font.family, fontSize: type.h3.size, fontWeight: 700, color: color.ink }}>
              {demo.kiosk.title}
            </p>
            <p style={{ margin: 0, fontFamily: font.family, fontSize: type.body.size, color: color.inkMuted }}>
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
            {demo.kiosk.languages.map((lang, i) => (
              <button
                key={lang}
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
                {lang}
              </button>
            ))}
          </div>

          {/* Select prompt */}
          <p style={{
            margin: 0,
            fontFamily: font.family,
            fontSize: type.body.size,
            color: color.inkMuted,
            textAlign: 'center',
          }}>
            {demo.kiosk.selectPrompt}
          </p>

          {/* Seat grid */}
          <SeatGrid seats={seats} onSeatClick={handleSeatClick} interactive={true} />

          {/* Confirm hint */}
          <p style={{
            margin: 0,
            fontFamily: font.family,
            fontSize: 10,
            color: color.inkFaint,
            textAlign: 'center',
          }}>
            {demo.kiosk.confirmLabel}
          </p>
        </div>

        {/* ── Right: 사장님 대시보드 ── */}
        <div style={{
          background: '#0A0A0A',
          borderRadius: 16,
          padding: 'clamp(20px, 2.5vw, 32px)',
          border: '5px solid #222',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
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
            <p style={{ margin: 0, fontFamily: font.family, fontSize: type.body.size, color: color.inkMuted }}>
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
                <span style={{ fontFamily: font.family, fontSize: 10, color: color.inkFaint }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Mirrored seat grid */}
          <SeatGrid seats={seats} onSeatClick={() => {}} interactive={false} />
        </div>
      </div>
    </section>
  );
}
