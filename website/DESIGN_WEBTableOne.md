# DESIGN SYSTEM — Table One Web Portfolio

## 컬러 토큰

### Violet (전시 포스터 추출색 — 실제 사용 팔레트)

| 토큰 | 값 | 용도 |
|---|---|---|
| `primary` | `#7C3AED` | CTA 버튼, 강조 포인트, 기본 보라 (기존 유지) |
| `violetDeep` | `#7A3FC7` | 큰 면적 강조, 블러 글로우, 어두운 보라 배경 |
| `violetSoft` | `#8A82F6` | 연보라 강조, 그라데이션 끝점, 보조 라벨, 아이콘 |
| `violetMid` | `#967AE0` | 도트 패턴, 미세 장식, 중간 톤 포인트 |

**그라데이션 토큰:** `gradient.violet = linear-gradient(135deg, #7C3AED, #8A82F6)`
→ 히어로 배경 강조, 버튼 hover, 섹션 accent 영역에 사용 가능

### Primary (Orange Brand)

| 토큰 | 값 | 용도 |
|---|---|---|
| `brand` | `#FE4901` | CTA, 강조, 포인트 |
| `brandStrong` | `#CC3A00` | hover, pressed 상태 |
| `brandSky` | `#FF8C5A` | secondary accent |
| `brandAlt` | `#FFAD8A` | tertiary tint |
| `brandLight` | `#FFCFBA` | 배경 틴트 (light 전용) |
| `brandPale` | `#FFF0EA` | 카드 배경 틴트 (light 전용) |

### Neutral (Dark Base)

| 토큰 | 값 | 용도 |
|---|---|---|
| `bg` | `#1A1A1A` | 전체 페이지 배경 |
| `bgAlpha` | `rgba(26,26,26,0.95)` | Nav 반투명 배경 |
| `surface` | `#242424` | 카드 배경 |
| `surfaceHigh` | `#2E2E2E` | 카드 hover |
| `line` | `#333333` | 구분선, 테두리 |

### Text

| 토큰 | 값 | 용도 |
|---|---|---|
| `ink` | `#FFFFFF` | 기본 텍스트 (on dark) |
| `inkMuted` | `rgba(255,255,255,0.60)` | 보조 텍스트 |
| `inkFaint` | `rgba(255,255,255,0.35)` | 힌트, placeholder |

### Semantic

| 토큰 | 값 | 용도 |
|---|---|---|
| `ok` | `#27AE60` | 긍정 지표, 성공 상태 |
| `warn` | `#E5484D` | 경고, 오류 |
| `white` | `#FFFFFF` | 흰 배경 블록 (light 섹션) |

### 제거 대상 (강릉페이 블루 잔재)

아래 값은 이 프로젝트에서 **절대 사용 금지**:

- `#1D4ED8` — 구 brand
- `#1B4FD8` — 구 brandStrong
- `#EEF2FF` — 구 brandPale
- `#F1F7FF` — 구 brandSky
- `#4B82DF` — 구 brandAlt
- `rgba(245,245,245,*)` — 구 bg 계열

---

## 타이포그래피

**폰트:** `'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', system-ui, sans-serif`

| 스케일 | size | line-height | weight | letter-spacing |
|---|---|---|---|---|
| `display` | clamp(37px, 5.4vw, 80px) | 1.22 | 800 | -0.04em |
| `h1` | clamp(27px, 3.75vw, 53px) | 1.22 | 800 | -0.03em |
| `h2` | clamp(22px, 2.67vw, 40px) | 1.25 | 700 | -0.02em |
| `h3` | clamp(17px, 1.58vw, 23px) | 1.35 | 700 | -0.01em |
| `lead` | clamp(13px, 1.17vw, 17px) | 1.75 | 400 | — |
| `body` | clamp(11px, 0.9vw, 13px) | 1.78 | 400 | — |
| `caption` | clamp(10px, 0.76vw, 11px) | 1.55 | 500 | — |
| `eyebrow` | clamp(13px, 1vw, 16px) | — | 800 | 0em / uppercase |

---

## 컴포넌트 패턴

### SectionHeader

```jsx
// eyebrow(대문자 라벨) + 제목 + 선택적 설명
<SectionHeader eyebrow="RESEARCH" title="우리가 발견한 것" />
```

- eyebrow: `color.inkFaint`, `type.eyebrow`
- title: `color.ink`, `type.h1`
- 기본 여백: `paddingTop: layout.sectionY`

### Card (다크 카드)

```jsx
// 기본 카드: surface 배경 + rLg 반경
background: color.surface
borderRadius: layout.rLg
padding: '2rem'
```

### QuoteCard (인터뷰 인용)

```jsx
// 좌측 brand 보더 + 이탤릭 인용
borderLeft: `4px solid ${color.brand}`
fontStyle: 'italic'
color: color.inkMuted
```

### StatBadge (수치 강조)

```jsx
// 큰 숫자 + 설명 레이블
<number style={{ color: color.brand, ...type.display }} />
<label style={{ color: color.inkMuted, ...type.caption }} />
```

### Chart Bar

- 배경 트랙: `color.line`
- 채워진 바: `color.brand`
- 긍정 지표: `color.ok`

---

## 다크 배경 레이아웃 원칙

1. **기본 배경은 `#1A1A1A`** — 흰 배경 섹션은 예외적으로만
2. **카드는 `#242424`** — 배경보다 명도 +2스텝
3. **브랜드 포인트는 아낌없이 쓰되 텍스트에는 금지** — CTA, 수치, 아이콘에만
4. **구분선은 `#333333`** — 배경이 어두우므로 subtle하게
5. **섹션 간 여백:** `layout.sectionY = clamp(83px, 10.4vw, 167px)`
6. **컨테이너 최대폭:** `layout.container = 1440px`, 좌우 패딩 `layout.gut`
