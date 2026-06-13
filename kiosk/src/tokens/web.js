export const color = {
  bg:            '#FFFFFF',
  bgCard:        '#FFFFFF',
  bgAlpha:       'rgba(255,255,255,0.95)',
  bgSurface:     'rgba(0,0,0,0.05)',   // pill/card 배경용 (흰 면에서 미묘한 구분)

  primary:       '#7C3AED',
  primaryStrong: '#6D28D9',
  primaryLight:  'rgba(124,58,237,0.10)',  // 선택 중 bg 틴트 / 추천 bg 틴트
  accent:        '#8B5CF6',

  ink:           '#111111',   // 주 텍스트 — 진한 검정
  inkMuted:      '#111111',   // 보조 텍스트도 동일 — 위계는 크기/굵기로만
  inkFaint:      '#111111',   // 설명 텍스트도 동일

  line:          'rgba(0,0,0,0.14)',
  warn:          '#92400E',   // 짙은 앰버 — 흰 배경에서 충분한 대비
  ok:            '#059669',
};

export const font = {
  family: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', system-ui, sans-serif",
};

export const type = {
  display: { size: 'clamp(31px,5.4vw,74px)',   lh: 1.22, weight: 800, ls: '-0.04em' },
  h1:      { size: 'clamp(21px,3.75vw,47px)',  lh: 1.22, weight: 800, ls: '-0.03em' },
  h2:      { size: 'clamp(16px,2.67vw,34px)',  lh: 1.25, weight: 700, ls: '-0.02em' },
  h3:      { size: 'clamp(17px,1.58vw,23px)',  lh: 1.35, weight: 700, ls: '-0.01em' },
  lead:    { size: 'clamp(13px,1.17vw,17px)',  lh: 1.75, weight: 400 },
  body:    { size: 'clamp(11px,0.9vw,13px)',   lh: 1.78, weight: 400 },
  caption: { size: 'clamp(10px,0.76vw,11px)',  lh: 1.55, weight: 500 },
  eyebrow: { size: 'clamp(17px,1.3vw,20px)', weight: 800, ls: '0em', transform: 'uppercase' },
};

export const layout = {
  container: '1440px',
  gut:       'clamp(20px, 8.3vw, 133px)',
  sectionY:  'clamp(40px, 5.5vw, 80px)',
  rLg: 'clamp(12px, 1.5vw, 24px)',
  rMd: 'clamp(8px, 1vw, 16px)',
  rSm: 'clamp(4px, 0.5vw, 8px)',
};
