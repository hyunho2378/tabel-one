# TABLE ONE — Project Work Guide

## 프로젝트 정체성

**프로젝트명:** Table One  
**서비스명:** Table One (Solo-Dining Hub)  
**한 줄 설명:** 국적과 언어에 관계없이, 혼밥러 모두가 탐색부터 퇴장까지 존중받을 수 있도록 설계한 디지털·오프라인 통합 CX 디자인 프로젝트  
**수업:** Digital CX for Startup — 한림대학교 / 지도교수: 김성우 교수님  
**팀:** CX Design Team H2S — 주현호 / Jhangeer Hilwa / 김서영 / Khalaf Sina  
**기간:** 2026.03 ~ 2026.05 (1학기)  
**지역:** 춘천  
**방법론:** Double Diamond

**차별점:**  
단순 앱 UI가 아닌, 혼밥러의 전체 경험 여정(탐색 → 입장 → 식사 → 퇴장)을 디지털·오프라인 양쪽에서 설계. 한국인과 외국인 두 타깃 모두를 동시에 포용하는 이중 타깃 CX 전략.

---

## 기술 스택

| 항목 | 스펙 |
|---|---|
| 프레임워크 | React 18 + Vite |
| 스타일링 | Tailwind CSS (토큰 기반) + inline style (tokens/web.js) |
| 폰트 | Pretendard Variable (Google Fonts CDN) |
| 데이터 | src/data/*.json — 컴포넌트 하드코딩 절대 금지 |
| 토큰 | src/tokens/web.js → tailwind.config.js 동기화 |

---

## 데이터 원칙

- **모든 수치·텍스트 콘텐츠는 `src/data/*.json`에서만 관리**
- 컴포넌트 내부 하드코딩 금지 — 수치가 바뀔 때 JSON 한 곳만 수정
- 기존 `research.json` / `survey.json`은 레퍼런스 참고용으로만 보존, **새 JSON 파일로 교체**
- JSON 파일 네이밍: 섹션별 기능 단위로 분리 (예: `stats.json`, `survey.json`, `idi.json`, `persona.json`)

---

## 섹션 구조 (스크롤 순서)

기존 28개 섹션 컴포넌트는 건드리지 않음. 새 컴포넌트로 교체.

| # | 섹션 컴포넌트 | 설명 | 데이터 |
|---|---|---|---|
| 1 | `Hero` | 서비스명 + 한 줄 설명 + 핵심 수치 3개 | `stats.json` |
| 2 | `Overview` | 프로젝트 소개 + 팀 | `project.json` |
| 3 | `ResearchOverview` | 5W1H + 방법론 3개 (설문/IDI/사파리) | `project.json` |
| 4 | `Survey` | 정량 설문 n=64 차트 | `survey.json` |
| 5 | `IDI` | 심층 인터뷰 4명 (한국인2 + 외국인2) | `idi.json` |
| 6 | `ServiceSafari` | 춘천 미성카츠 현장 관찰 | `safari.json` |
| 7 | `Affinity` | 잠재 니즈 어피니티 4개 클러스터 | `affinity.json` |
| 8 | `Persona` | 김서영 + Lilia 2개 페르소나 | `persona.json` |
| 9 | `AsIsCJM` | As-Is CJM (김서영 + Lilia) | `cjm.json` |
| 10 | `Insights` | 핵심 인사이트 3개 | `insights.json` |
| 11 | `StrategyShift` | 전략 전환 — 앱 → 공간 컨설팅 | `strategy.json` |
| 12 | `ToBeCJM` | To-Be CJM — **placeholder** | — |
| 13 | `ServiceBlueprint` | Service Blueprint — **placeholder** | — |
| 14 | `BMC` | 비즈니스 모델 캔버스 | `bmc.json` |
| 15 | `Outro` | 마무리 + 팀 크레딧 | `project.json` |

---

## 절대 규칙

1. **수치는 JSON 한 곳에서만** — 컴포넌트에 숫자 리터럴 금지
2. **강릉페이 파란색 잔재 전면 제거** — `#1D4ED8`, `#1B4FD8`, `#EEF2FF`, `#F1F7FF`, `#4B82DF` 사용 금지
3. **기존 research.json / survey.json 보존** — 덮어쓰지 말고 새 JSON 파일로 교체
4. **기존 28개 섹션 컴포넌트 수정 금지** — 새 파일로 교체하고 App.jsx import만 교체
5. **To-Be CJM / Service Blueprint** — 빈 placeholder 섹션으로 먼저 배치, 콘텐츠는 추후 채움
6. 모든 색상 참조는 `tokens/web.js` → tailwind config 경로로만

---

## 핵심 성과 수치 (Stats 바)

| 수치 | 값 |
|---|---|
| 설문 응답자 | n=64 (한국인 39 + 외국인 25) |
| IDI 심층 인터뷰 | n=4 (한국인 2 + 외국인 2) |
| 두 그룹 공통 1위 불편함 | 타인의 시선 26~28% |
