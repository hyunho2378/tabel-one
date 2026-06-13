import { useState } from 'react';
import { color, font, type } from './tokens/web.js';
import kioskData from './data/kiosk.json';

const { kiosk, dashboard } = kioskData;

const PW = 320;
const PH = 190;

// ── 화이트 배경 기준 좌석 상태 색 ──────────────────────────────
const STATUS_BG = {
  occupied:  '#0F172A',              // 짙은 남색 — 비어있음과 확실히 구분
  available: 'rgba(0,0,0,0.02)',     // 거의 흰색
  selecting: 'rgba(124,58,237,0.12)',// 연한 바이올렛 틴트
  confirmed: '#059669',              // 진한 그린
};
const STATUS_TEXT = {
  occupied:  '#FFFFFF',   // 흰 텍스트 on 남색 배경
  available: '#111111',   // 검정 on 흰 배경
  selecting: '#111111',   // 검정 on 연한 바이올렛 — 최대 가독성
  confirmed: '#FFFFFF',   // 흰 텍스트 on 그린 배경
};
const STATUS_BORDER = {
  occupied:  '2px solid rgba(255,255,255,0.22)', // 남색 bg 위 내부 구분선
  available: '2px solid #111111',                // 검정 보더 — 비어있음
  selecting: '3px solid #7C3AED',               // 강조 바이올렛 보더
  confirmed: 'none',                             // 그린 bg로 충분
};

function FloorPlan({
  seats, onSeatClick, interactive,
  zones, statusLabels, recommended, seatSuffix,
  blockedSeatIds = new Set(),
  blockedMsg = '',
  partitionedSeatId = null,
  onBlockedClick = () => {},
  shakingSeatId = null,
}) {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: `${PW} / ${PH}`, flexShrink: 0 }}>
      <svg
        viewBox={`0 0 ${PW} ${PH}`}
        width="100%"
        height="100%"
        style={{ display: 'block' }}
        aria-hidden="true"
      >
        {/* 방 외벽 — 2px 스트로크로 선명하게 */}
        <rect x="1" y="1" width={PW - 2} height={PH - 2}
          fill="#F5F3FF" stroke="rgba(0,0,0,0.22)" strokeWidth="2" rx="4" />
        {/* 주방 스트립 — 우상단 */}
        <rect x="210" y="0" width="110" height="14" fill="rgba(0,0,0,0.05)" />
        {/* 수직 구분선 — 좌구역(창가+2인석+일반1인석) / 우구역(4인석) */}
        <line x1="208" y1="4" x2="208" y2="185"
          stroke="rgba(0,0,0,0.14)" strokeWidth="1" />
        {/* 창가 파티션 1인석 zone 라벨 */}
        <text x="100" y="10" textAnchor="middle"
          fill="#111111" fontSize="6.5" fontWeight="400" letterSpacing="0.5"
          fontFamily={font.family}>{zones.windowSolo}</text>
        {/* 주방 라벨 */}
        <text x="265" y="10" textAnchor="middle"
          fill="#111111" fontSize="6.5" fontWeight="400" letterSpacing="0.8"
          fontFamily={font.family}>{zones.kitchen}</text>
        {/* 수평 구분선 — 창가 1인석 ↔ 하단 구역 */}
        <line x1="4" y1="84" x2="204" y2="84"
          stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
        {/* 하단 좌구역 라벨 — 2인석 */}
        <text x="8" y="93"
          fill="#111111" fontSize="6.5" fontWeight="400" letterSpacing="0.5"
          fontFamily={font.family}>{zones.twoSeat}</text>
        {/* 하단 우구역 라벨 — 일반 1인석 */}
        <text x="122" y="93"
          fill="#111111" fontSize="6.5" fontWeight="400" letterSpacing="0.5"
          fontFamily={font.family}>{zones.regularSolo}</text>
        {/* 4인석 zone 라벨 */}
        <text x="264" y="26" textAnchor="middle"
          fill="#111111" fontSize="6.5" fontWeight="400" letterSpacing="0.5"
          fontFamily={font.family}>{zones.fourSeat}</text>
        {/* 입구 — 하단 좌구역 (점선 + 라벨) */}
        <line x1="4" y1="172" x2="204" y2="172"
          stroke="rgba(0,0,0,0.20)" strokeWidth="2" strokeDasharray="4,3" />
        <text x="104" y="183" textAnchor="middle"
          fill="#111111" fontSize="6.5" fontWeight="400"
          fontFamily={font.family}>{zones.entrance}</text>
      </svg>

      {seats.map(seat => {
        const isBlocked = blockedSeatIds.has(seat.id);
        const isClickable = interactive && seat.status === 'available' && !isBlocked;
        const isRec = !!seat.recommended && seat.status === 'available' && !isBlocked;
        const isPartitioned = partitionedSeatId === seat.id;

        const bg = isBlocked
          ? 'rgba(146,64,14,0.08)'          // 짙은 앰버 틴트
          : (isRec ? 'rgba(124,58,237,0.08)' : STATUS_BG[seat.status]);
        const border = isBlocked
          ? `2px solid ${color.warn}`
          : (isRec ? `3px solid ${color.primary}` : STATUS_BORDER[seat.status]);

        // 좌석 번호: 남색/그린 배경엔 흰 텍스트, 나머지엔 검정
        const seatNumColor = isBlocked
          ? color.warn
          : (seat.status === 'occupied' || seat.status === 'confirmed')
            ? '#FFFFFF'
            : '#111111';

        return (
          <button
            key={seat.id}
            onClick={() => {
              if (isClickable) onSeatClick(seat.id);
              else if (isBlocked && interactive) onBlockedClick(seat.id);
            }}
            style={{
              position: 'absolute',
              left:   `${seat.x / PW * 100}%`,
              top:    `${seat.y / PH * 100}%`,
              width:  `${seat.w / PW * 100}%`,
              height: `${seat.h / PH * 100}%`,
              background: bg,
              border,
              borderRadius: 6,
              cursor: isClickable ? 'pointer' : (isBlocked && interactive ? 'not-allowed' : 'default'),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              padding: '3px 4px',
              boxSizing: 'border-box',
              overflow: 'hidden',
              transition: 'background 0.2s ease, border-color 0.2s ease',
              animation: shakingSeatId === seat.id
                ? 'shake 0.35s ease'
                : (seat.status === 'selecting' ? 'pulse 1.1s ease-in-out infinite' : 'none'),
            }}
          >
            {/* 칸막이 선 — 확정된 4인석에 표시 */}
            {isPartitioned && (
              <div style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                width: 2,
                height: '100%',
                background: color.bg,    // 흰 칸막이 선 on 그린 배경
                opacity: 0.85,
                animation: 'partitionGrow 0.55s cubic-bezier(0.4,0,0.2,1) forwards',
                transformOrigin: 'top center',
                pointerEvents: 'none',
                zIndex: 2,
              }} />
            )}

            {/* 좌석 번호 */}
            <span style={{
              fontFamily: font.family,
              fontSize: type.h3.size,
              fontWeight: 700,
              color: seatNumColor,
              lineHeight: 1,
              position: 'relative',
              zIndex: 3,
            }}>
              {seat.label}{seatSuffix}
            </span>

            {/* 상태 / 배지 / 제한 텍스트 */}
            {isBlocked ? (
              <span style={{
                fontFamily: font.family,
                fontSize: type.caption.size,
                fontWeight: 400,
                color: color.warn,
                lineHeight: 1,
                textAlign: 'center',
                position: 'relative',
                zIndex: 3,
              }}>
                {blockedMsg}
              </span>
            ) : isRec ? (
              <span style={{
                fontFamily: font.family,
                fontSize: type.caption.size,
                color: color.primary,    // #7C3AED — 흰 bg 위 바이올렛
                fontWeight: 700,
                lineHeight: 1,
                position: 'relative',
                zIndex: 3,
              }}>
                {recommended}
              </span>
            ) : (
              <span style={{
                fontFamily: font.family,
                fontSize: type.caption.size,
                fontWeight: 400,
                // available: 바이올렛 / 나머지: 배경색에 맞는 텍스트
                color: seat.status === 'available' ? color.primary : STATUS_TEXT[seat.status],
                lineHeight: 1,
                position: 'relative',
                zIndex: 3,
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

export default function App() {
  const [seats, setSeats] = useState(() => kiosk.seats.map(s => ({ ...s })));
  const [langIdx, setLangIdx] = useState(0);
  const [notification, setNotification] = useState(null);
  const [operationMode, setOperationMode] = useState('relaxed');
  const [partySize, setPartySize] = useState(null);
  const [partitionedSeatId, setPartitionedSeatId] = useState(null);
  const [shakingSeatId, setShakingSeatId] = useState(null);
  const [blockedAlert, setBlockedAlert] = useState(null);

  const langKey = kiosk.langKeys[langIdx];
  const lang = kiosk.i18n[langKey];

  const blockedSeatIds = (operationMode === 'busy' && partySize !== null && partySize <= 2)
    ? new Set(kiosk.seats.filter(s => s.type === '4인석').map(s => s.id))
    : new Set();

  const selectingSeat = seats.find(s => s.status === 'selecting');
  const confirmedSeat = seats.find(s => s.status === 'confirmed');
  const hasActiveSeat = !!(selectingSeat || confirmedSeat);

  function handleBlockedClick(id) {
    setShakingSeatId(id);
    setBlockedAlert(lang.fourSeatBusyAlert);
    setTimeout(() => setShakingSeatId(null), 350);
    setTimeout(() => setBlockedAlert(null), 3000);
  }

  function handleSeatClick(id) {
    const seat = seats.find(s => s.id === id);
    if (!seat || seat.status !== 'available') return;

    setSeats(prev => prev.map(s => s.id === id ? { ...s, status: 'selecting' } : s));

    setTimeout(() => {
      setSeats(prev => prev.map(s => s.id === id ? { ...s, status: 'confirmed' } : s));
      const seatNum = kiosk.seats.find(s => s.id === id).label;
      setNotification(lang.notification.replace('{n}', seatNum));
      if (operationMode === 'relaxed' && seat.type === '4인석') {
        setPartitionedSeatId(id);
      }
      setTimeout(() => setNotification(null), 3000);
    }, 1500);
  }

  // 단계 라벨 헬퍼 (인라인)
  const stepBadge = (n) => (
    <div style={{
      flexShrink: 0,
      width: 18, height: 18,
      borderRadius: '50%',
      border: '1px solid rgba(0,0,0,0.20)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: font.family,
      fontSize: '9px',
      fontWeight: 600,
      color: color.ink,
    }}>
      {n}
    </div>
  );

  const stepText = (text, dir = 'ltr') => (
    <span style={{
      fontFamily: font.family,
      fontSize: type.caption.size,
      fontWeight: 400,
      color: color.ink,
      letterSpacing: '0.03em',
      direction: dir,
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    }}>
      {text}
    </span>
  );

  const stepRow = (n, text, dir = 'ltr') => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginBottom: 8,
      flexDirection: dir === 'rtl' ? 'row-reverse' : 'row',
    }}>
      {stepBadge(n)}
      {stepText(text, dir)}
    </div>
  );

  // 확정 버튼 배경 — 활성 시 colored bg, 텍스트는 항상 대비 확보
  const confirmBg = confirmedSeat
    ? color.ok
    : selectingSeat
      ? color.primary
      : color.bgSurface;

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      background: color.bg,
      fontFamily: font.family,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      overflow: 'hidden',
    }}>

      {/* ── 왼쪽: 손님 키오스크 (55%) ── */}
      <div style={{
        flex: '0 0 55%',
        display: 'flex',
        flexDirection: 'column',
        background: color.bg,
        borderRight: `1px solid ${color.line}`,
        padding: 'clamp(24px, 3vw, 48px)',
        gap: 12,
        overflow: 'hidden',
      }}>

        {/* 헤더 */}
        <div style={{ flexShrink: 0 }}>
          <p style={{
            margin: '0 0 4px',
            fontFamily: font.family,
            fontSize: type.h2.size,
            fontWeight: 700,
            color: color.ink,
            letterSpacing: '-0.02em',
          }}>
            {lang.kioskTitle}
          </p>
          <p style={{
            margin: 0,
            fontFamily: font.family,
            fontSize: type.lead.size,
            fontWeight: 400,
            color: color.ink,
          }}>
            {lang.kioskSub}
          </p>
        </div>

        {/* STEP 1 — 언어 선택 */}
        <div style={{ flexShrink: 0 }}>
          {stepRow(1, lang.stepLanguage, lang.dir)}
          <div style={{
            display: 'flex',
            gap: 6,
            background: color.bgSurface,
            borderRadius: 999,
            padding: 5,
          }}>
            {kiosk.languages.map((langLabel, i) => (
              <button
                key={kiosk.langKeys[i]}
                onClick={() => setLangIdx(i)}
                style={{
                  flex: 1,
                  background: langIdx === i ? color.primary : 'transparent',
                  color: langIdx === i ? '#fff' : color.ink,
                  border: 'none',
                  borderRadius: 999,
                  fontFamily: font.family,
                  fontSize: type.lead.size,
                  fontWeight: langIdx === i ? 600 : 400,
                  padding: 'clamp(8px, 1vw, 14px) 12px',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {langLabel}
              </button>
            ))}
          </div>
        </div>

        {/* STEP 2 — 인원 선택 */}
        <div style={{ flexShrink: 0 }}>
          {stepRow(2, lang.partySizePrompt, lang.dir)}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            {[1, 2, 3, 4].map(n => (
              <button
                key={n}
                onClick={() => setPartySize(n)}
                style={{
                  background: partySize === n ? color.primary : color.bgSurface,
                  color: partySize === n ? '#fff' : color.ink,
                  border: partySize === n ? 'none' : `1px solid ${color.line}`,
                  borderRadius: 10,
                  fontFamily: font.family,
                  fontSize: type.lead.size,
                  fontWeight: partySize === n ? 700 : 400,
                  width: 'clamp(44px, 4.5vw, 60px)',
                  height: 'clamp(44px, 4.5vw, 60px)',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                  flexShrink: 0,
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* STEP 3 — 좌석 선택 + 평면도 */}
        <div style={{ flexShrink: 0 }}>
          {stepRow(3, lang.selectPrompt, lang.dir)}

          {blockedAlert && (
            <div style={{
              marginBottom: 8,
              background: 'rgba(146,64,14,0.08)',
              border: `1px solid ${color.warn}`,
              borderRadius: 8,
              padding: '10px 16px',
              fontFamily: font.family,
              fontSize: type.body.size,
              fontWeight: 400,
              color: color.warn,
              textAlign: 'center',
              direction: lang.dir,
              lineHeight: 1.5,
            }}>
              {blockedAlert}
            </div>
          )}

          <FloorPlan
            seats={seats}
            onSeatClick={handleSeatClick}
            interactive={true}
            zones={lang.zones}
            statusLabels={lang.status}
            recommended={lang.recommended}
            seatSuffix={lang.seatSuffix}
            blockedSeatIds={blockedSeatIds}
            blockedMsg={lang.fourSeatBusy}
            partitionedSeatId={partitionedSeatId}
            onBlockedClick={handleBlockedClick}
            shakingSeatId={shakingSeatId}
          />
        </div>

        {/* STEP 4 — 확정 버튼 */}
        <button
          style={{
            flexShrink: 0,
            width: '100%',
            height: 'clamp(48px, 4.5vw, 62px)',
            background: confirmBg,
            border: hasActiveSeat ? 'none' : `1px solid ${color.line}`,
            borderRadius: 12,
            fontFamily: font.family,
            fontSize: type.lead.size,
            fontWeight: hasActiveSeat ? 700 : 400,
            // 컬러 bg(바이올렛/그린) 위 → 흰 텍스트 / 비활성(연한 bg) → 검정
            color: hasActiveSeat ? '#FFFFFF' : color.ink,
            cursor: 'default',
            pointerEvents: 'none',
            transition: 'background 0.35s ease, color 0.35s ease, border-color 0.35s ease',
            direction: lang.dir,
          }}
        >
          {lang.confirmLabel}
        </button>
      </div>

      {/* ── 오른쪽: 사장님 대시보드 (45%) ── */}
      <div style={{
        flex: '0 0 45%',
        display: 'flex',
        flexDirection: 'column',
        background: color.bg,
        padding: 'clamp(24px, 3vw, 48px)',
        gap: 16,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* 알림 배너 */}
        {notification && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            background: color.primary,
            color: '#fff',
            fontFamily: font.family,
            fontSize: type.lead.size,
            fontWeight: 700,
            padding: '16px 28px',
            textAlign: 'center',
            animation: 'slideDown 0.3s ease',
            zIndex: 10,
          }}>
            🔔 {notification}
          </div>
        )}

        {/* 헤더 */}
        <div style={{ marginTop: notification ? 60 : 0, transition: 'margin-top 0.3s ease', flexShrink: 0 }}>
          <p style={{
            margin: '0 0 4px',
            fontFamily: font.family,
            fontSize: type.h2.size,
            fontWeight: 700,
            color: color.ink,
            letterSpacing: '-0.02em',
          }}>
            {lang.dashboardTitle}
          </p>
          <p style={{
            margin: 0,
            fontFamily: font.family,
            fontSize: type.lead.size,
            fontWeight: 400,
            color: color.ink,
          }}>
            {lang.dashboardSub}
          </p>
        </div>

        {/* 운영 모드 토글 */}
        <div style={{
          flexShrink: 0,
          background: color.bgSurface,
          border: `1px solid ${color.line}`,
          borderRadius: 12,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <div style={{ overflow: 'hidden', minWidth: 0 }}>
            <p style={{ margin: '0 0 2px', fontFamily: font.family, fontSize: type.body.size, fontWeight: 700, color: color.ink, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {lang.modeTitle}
            </p>
            <p style={{ margin: 0, fontFamily: font.family, fontSize: type.body.size, color: color.ink, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {operationMode === 'relaxed' ? lang.modeRelaxedDesc : lang.modeBusyDesc}
            </p>
          </div>
          <div style={{
            display: 'flex',
            gap: 3,
            background: color.bgSurface,
            borderRadius: 999,
            padding: 3,
            flexShrink: 0,
          }}>
            {[
              { key: 'relaxed', label: lang.modeRelaxed },
              { key: 'busy',    label: lang.modeBusy },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setOperationMode(key)}
                style={{
                  background: operationMode === key ? color.primary : 'transparent',
                  color: operationMode === key ? '#fff' : color.ink,
                  border: 'none',
                  borderRadius: 999,
                  fontFamily: font.family,
                  fontSize: type.body.size,
                  fontWeight: operationMode === key ? 700 : 400,
                  padding: 'clamp(6px, 0.7vw, 10px) clamp(14px, 1.5vw, 22px)',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 상태 범례 */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px 24px',
          flexShrink: 0,
        }}>
          {Object.entries(lang.status).map(([key, label]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                // available → 검정 점(보더 색 대표), selecting → 바이올렛, 나머지 → STATUS_BG
                background: key === 'available'
                  ? '#111111'
                  : key === 'selecting'
                    ? color.primary
                    : STATUS_BG[key],
                border: key === 'confirmed' ? 'none' : 'none',
              }} />
              <span style={{
                fontFamily: font.family,
                fontSize: type.body.size,
                fontWeight: 400,
                color: color.ink,
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* 평면도 — 비대화형 */}
        <FloorPlan
          seats={seats}
          onSeatClick={() => {}}
          interactive={false}
          zones={lang.zones}
          statusLabels={lang.status}
          recommended={lang.recommended}
          seatSuffix={lang.seatSuffix}
          partitionedSeatId={partitionedSeatId}
        />

        {/* 푸터 */}
        <p style={{
          margin: 0,
          fontFamily: font.family,
          fontSize: type.caption.size,
          color: color.ink,
          flexShrink: 0,
          textAlign: 'center',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>
          Table One · Real-time Seat Status
        </p>
      </div>
    </div>
  );
}
