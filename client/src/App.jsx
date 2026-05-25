import { color, font } from './tokens/web.js';

export default function App() {
  return (
    <div
      style={{
        background: color.bg,
        fontFamily: font.family,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <p style={{ color: color.inkMuted, fontSize: 16 }}>
        Table One — CX 컨설팅 소개 사이트 (준비 중)
      </p>
    </div>
  );
}
