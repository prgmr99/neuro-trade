# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Product Vision

NeuroTrade는 **뉴스 기반 주식 트레이딩 시뮬레이션 게임**이다. 플레이어는 가상 뉴스를 분석하고 매매 결정을 내려 포트폴리오 수익률을 극대화한다.

- **타겟 유저**: 주식에 관심 있는 한국 2030 세대. 실제 투자 경험이 적거나, 게임으로 감각을 익히고 싶은 유저.
- **핵심 경험**: "뉴스를 읽고 판단하는 긴장감" + "수익률로 증명하는 성취감". 가볍게 시작하되, 반복 플레이와 경쟁(랭킹, 듀얼)으로 리텐션을 만든다.
- **디자인 레퍼런스**: 토스(Toss) — 깔끔한 금융 UI, 직관적 인터랙션, 한 손 조작 최적화.
- **경쟁 차별점**: 실시간 시세가 아닌 시나리오 기반이므로 운보다 분석력이 중요. 다양한 모드(클래식 5일, 어드밴스 30일, 플래시, 데일리 챌린지, 듀얼, 멀티플레이어)로 재플레이 동기를 부여한다.

## Commands

- **Dev server:** `pnpm dev` (Vite, default port 5173)
- **Build:** `pnpm build` (runs `tsc -b && vite build`, output in `dist/`)
- **Lint:** `pnpm lint` (ESLint)
- **Preview production build:** `pnpm preview`

No test framework is configured. 수동 검증 시 아래 QA 체크리스트를 사용할 것.

## Environment & Deployment

### 환경 변수
```
VITE_SUPABASE_URL=<Supabase 프로젝트 URL>
VITE_SUPABASE_ANON_KEY=<Supabase anon/public key>
```
- `.env` 또는 `.env.local`에 설정. **절대 커밋하지 않는다.**
- 멀티플레이어(`LiveCompetition`) 기능에 필수. 없으면 Supabase 클라이언트 초기화 실패.
- Vercel 배포 시 Environment Variables에 동일하게 설정.

### 배포
- **호스팅**: Vercel
- **프로덕션 URL**: `https://neuro-trade.yeomniverse.com`
- **Analytics**: `@vercel/analytics` — `main.tsx`에서 `<Analytics />` 컴포넌트로 자동 수집
- 공유 텍스트에 프로덕션 URL이 하드코딩됨 (`src/lib/shareText.ts`)

## Architecture

NeuroTrade is a single-page React 18 + TypeScript trading simulation game. Players analyze fictional news over a 5-day cycle to trade stocks and maximize portfolio returns. Supports English and Korean (i18n).

### State Management

Four Zustand stores drive the app:

- **`src/store/gameStore.ts`** — Core game state: portfolio (cash + holdings), stocks with live prices, day progression, and news. The `nextDay()` action is the game engine — it applies news effects as price multipliers with random volatility noise, generates candlestick OHLC data, and advances the day counter. All buy/sell logic uses average cost basis accounting.
- **`src/store/useLanguageStore.ts`** — Language preference (`en`/`ko`), persisted to localStorage via Zustand's `persist` middleware.
- **`src/store/attendanceStore.ts`** — 출석 체크, 연속 스트릭, 보상 해금. `persist` 미들웨어로 localStorage에 저장.
- **`src/store/achievementStore.ts`** — 업적 해금/통계(총 게임 수, 플래시 승률 등). `persist` 미들웨어로 localStorage에 저장.

### i18n System

`src/i18n/translations.ts` contains all UI strings in a nested object keyed by language. The `useTranslation()` hook provides a `t()` function that resolves dot-path keys (e.g., `'market.buy'`) with optional `{placeholder}` interpolation. Stock names, descriptions, and news content use `LocalizedString` (`Record<'en' | 'ko', string>`) directly on the data objects rather than the translation system.

### Game Modes

6개 모드가 존재하며, App.tsx의 view query param으로 분기한다:

| 모드 | view | 일수 | 시작 자금 | 특이사항 |
|------|------|------|-----------|----------|
| Classic | `game` (mode=classic) | 5일 | $10,000 | Arc 기반 뉴스, effectScale 1.0 |
| Advanced | `game` (mode=advanced) | 10일 | $50,000 | preApplyRatio 0.25, marketGravity 0.20, effectScale 0.50 |
| Flash Round | `flash` | 1일 | - | 빠른 판단 미니게임 |
| Daily Challenge | `daily` | - | - | 매일 같은 시드, 전체 유저 동일 조건 |
| Duel | `duel` | - | - | 시드 공유로 1:1 대결 |
| Multiplayer | `multiplayer` | 무한 | $10,000 | Supabase Realtime, 60초 타이머 |

### Game Data

`src/data/index.ts`에서 모드별 시나리오를 export한다.

**Classic**: `src/data/classic.ts` — 5 stocks (`TECH`, `ECOM`, `GREEN`, `HEALTH`, `AERO`), base prices + volatility. `src/data/classic-arcs.ts`의 Arc Chain 시스템으로 뉴스 5개/일 생성.

**Advanced**: `src/data/advanced/stocks.ts` — 별도 주식 세트. `src/data/advanced/news.ts` — 30일분 뉴스. 어드밴스 전용 메커니즘:
- `preApplyRatio` (0.25): 뉴스 공개 시 효과의 25%가 이미 가격에 반영 (선반영)
- `marketGravity` (0.20): 시장 평균 회귀 — 급등/급락 후 되돌림
- `effectScale` (0.50): 뉴스 효과 50%로 축소 → 변동성 감소, 분석 중요도 증가
- `resilience`: 종목별 하락 저항력 (기관 매집 시뮬레이션)
- `whipsaw`: 뉴스 다음 날 반전 효과 (함정 뉴스)
- `prePriced` / `isBridgeNews`: 헤드라인과 실제 효과 불일치, 전환 맥락 뉴스

On game init, `setInitialState()` generates synthetic price history for days -19 to 0 so charts have data from the start.

### Key Patterns

- URL state managed via `nuqs` (wrapped in `NuqsAdapter` at root)
- All styling is custom CSS in `src/index.css` — no CSS framework
- Candlestick charts built with Recharts `ComposedChart` + Bar overlays
- PWA support via `public/manifest.json`
- Game flow: splash screen → 5-day trading loop → game over screen, controlled by `App.tsx` state
- Sound effects via Web Audio API (`src/lib/sounds.ts`): 매수/매도/에러 시 톤 생성. 별도 오디오 파일 없이 `OscillatorNode`로 합성.
- Social sharing (`src/lib/shareText.ts`): 게임 결과를 텍스트로 생성 (수익률 바 그래프 + 이모지). 일반 모드/플래시 모드 각각 포맷 존재. 프로덕션 URL + `#NeuroTrade` 해시태그 포함.

### Multiplayer Architecture (Beta)

Supabase 기반 실시간 멀티플레이어. 모든 참가자가 같은 시드/뉴스로 동시에 트레이딩한다.

**Backend**: Supabase (PostgreSQL + Realtime)
- `live_market_state` 테이블: 싱글 로우(id=1). `cycle_number`, `day`, `seed`, `day_ends_at`, `time_remaining` 저장
- RLS 적용: authenticated 유저만 읽기/업데이트 가능
- `supabase_realtime` publication으로 실시간 동기화

**Auth**: `src/hooks/useAuth.ts` — 익명 인증(`signInAnonymously()`). 별도 회원가입 없이 접속 즉시 Supabase anonymous user 생성.

**실시간 통신**: `src/hooks/useLiveMarket.ts`
- Supabase Realtime Channel 2개 사용:
  - `live-market-db`: postgres_changes로 `live_market_state` UPDATE 구독 → 모든 클라이언트에 day 변경 전파
  - `live-competition`: Presence(접속 유저 트래킹) + Broadcast(포트폴리오 업데이트)
- **Day 진행**: 60초 타이머, 클라이언트 측에서 만료 시 DB 업데이트 → Realtime으로 전파
- **Pause/Resume**: 접속자가 0명이면 `time_remaining`을 DB에 저장 → 다음 접속자가 이어서 시작
- 5일마다 Phase 전환: `buildPhaseNews()`로 Classic Arc Chain에서 새 뉴스 세트 로드

**제한사항**: 타이머 진행이 클라이언트 주도라 동시 업데이트 가능성 있음 (edge function으로 이관 고려)

### Hooks

- `src/hooks/useAuth.ts` — Supabase 익명 인증
- `src/hooks/useLiveMarket.ts` — 멀티플레이어 실시간 상태 관리

### Dark Mode (계획)

현재 라이트 모드만 지원. 다크 모드 지원 예정이므로:
- 색상값을 하드코딩하지 않고 반드시 CSS 변수(`--bg-color`, `--text-primary`, `--surface-color` 등)를 사용
- 새 색상 추가 시 `:root`에 시맨틱 변수로 정의하고, 추후 `[data-theme="dark"]` 선택자로 오버라이드 가능하게 설계
- 텍스트-배경 대비는 라이트/다크 모두에서 WCAG AA(4.5:1) 이상 확보를 전제로 색상 선택

## Design & UX Quality Criteria

모든 UI 작업은 아래 4가지 기준으로 자체 평가한다. 디자인 품질과 일관성을 가장 높은 가중치로 둔다.

### 1. 디자인 일관성 (가중치: 높음)
토스 디자인 시스템과의 정합성을 유지하는가?
- CSS 변수 시스템을 반드시 사용할 것 (`--accent-color`, `--positive`, `--negative`, `--surface-color` 등)
- 한국 금융 컨벤션 준수: 상승=빨강(`--positive: #f04452`), 하락=파랑(`--negative: #3182f6`)
- border-radius는 카드 24px, 버튼 12px, 칩 8px 계층을 유지
- 그림자는 `--shadow-xs/sm/md/lg/xl` 단계만 사용
- 트랜지션은 `--transition-fast/normal/spring`만 사용
- 폰트: 영문 Outfit, 한글 Pretendard Variable. 다른 폰트를 추가하지 않는다.

### 2. 모바일 우선 (가중치: 높음)
유저의 70%+가 모바일이다. 모바일에서 먼저 완벽해야 한다.
- 모든 터치 타겟 최소 44px (Apple HIG 기준)
- `100dvh` 사용 (vh 아님)
- `safe-area-inset` 적용
- 한 손 조작 최적화: 주요 CTA는 화면 하단에 배치
- 모바일에서 hover 효과 비활성화, `:active` 피드백(scale 0.97 + opacity 0.85) 적용

### 3. 기능 완결성 (가중치: 보통)
구현된 기능이 끝까지 동작하는가?
- 모든 인터랙션은 결과를 보여줘야 한다 (매수 → 잔고 변화, 뉴스 읽기 → 읽음 표시 등)
- 빈 상태(empty state)에 안내 텍스트 + CTA가 있어야 한다
- 에러/엣지 케이스: 잔고 부족, 보유량 0 매도, 0주 매수 시도 등을 자연스럽게 처리
- 한국어/영어 양쪽에서 레이아웃 깨짐이 없어야 한다

### 4. 정보 위계 (가중치: 보통)
금융 데이터가 한눈에 파악되는가?
- 숫자에는 반드시 `font-variant-numeric: tabular-nums` 적용
- 가격 변동은 색상(빨강/파랑) + 부호(+/-)로 즉시 인지 가능해야 한다
- 차트, 뉴스, 포트폴리오 간 시각적 위계가 명확해야 한다
- 정보 밀도를 적절히 유지: 모바일에서 스크롤 없이 핵심 정보가 보여야 한다

## Performance Targets

- **번들 크기**: 개별 청크 200kB 미만 (minified). 초과 시 `dynamic import()` 또는 `manualChunks`로 코드 스플릿
- **First Contentful Paint (FCP)**: 1초 미만
- **Lighthouse Performance**: 90점 이상 (모바일 기준)
- Recharts 등 무거운 라이브러리는 게임 뷰에서만 로드. 스플래시에서 불필요한 번들 포함 금지.

## Accessibility (WCAG AA)

- **색상 대비**: 텍스트-배경 4.5:1 이상. 대형 텍스트(18px+ bold) 3:1 이상.
- **키보드 내비게이션**: 모든 인터랙티브 요소에 focus 가능. `tabindex`, `:focus-visible` 스타일 적용. 포커스 트랩(모달).
- **스크린 리더**: 의미 있는 `aria-label` 적용. 가격 변동에 `aria-live="polite"`. 아이콘 버튼에 `aria-label` 필수.
- **시맨틱 HTML**: `<button>`, `<input>`, `<nav>`, `<main>`, `<section>` 적절히 사용. `<div onClick>` 패턴 금지.
- **모션**: `prefers-reduced-motion` 미디어 쿼리로 모든 애니메이션 비활성화 지원.
- 색상만으로 정보를 전달하지 않는다 (상승/하락은 색상 + 부호 + 아이콘 조합).

## Game Balance Rules

뉴스 effect 설계 시 아래 밸런스 규칙을 준수한다:

### Classic 모드 (effectScale 1.0 — raw 값이 그대로 적용)
- 단일 뉴스 effect: **±15% 이내** (multiplier 0.85 ~ 1.15)
- 같은 종목에 같은 날 복수 뉴스가 겹칠 수 있으므로 개별 값은 보수적으로
- 5일간 누적으로 단일 종목이 ±50% 이상 움직이면 밸런스 검토

### Advanced 모드 (effectScale 0.50, preApplyRatio 0.25)
- raw effect는 Classic보다 클 수 있음 (0.50 스케일링 후 적정 범위가 되도록)
- raw 기준 **±30% 이내** (multiplier 0.70 ~ 1.30) → 적용 후 ±15% 이내
- `whipsaw` 반전 효과는 5x effectScale 적용 — 함정 뉴스의 충격을 의도적으로 키움
- `resilience` 값은 0.0 ~ 0.5 범위. 0.5 초과하면 뉴스 효과가 거의 무효화됨

### 공통
- `Math.random()` 사용 금지. 모든 랜덤은 `mulberry32(seed)` PRNG 사용
- 시드가 같으면 결과가 동일해야 함 (결정적 시뮬레이션)

## Anti-Patterns — 절대 하지 말 것

### UI/디자인
- **CSS 프레임워크 도입 금지**: Tailwind, Bootstrap 등을 추가하지 않는다. 모든 스타일은 커스텀 CSS.
- **보라색 그라데이션 + 흰 카드**: 전형적인 AI 생성 디자인. 토스 컬러 시스템을 벗어나지 않는다.
- **버튼에 그라데이션 사용 금지**: 버튼 배경은 반드시 단색(`--accent-color` 등)을 사용한다. `--accent-gradient`를 버튼에 적용하지 않는다.
- **과도한 그라데이션/글로우**: `--accent-gradient`는 텍스트 장식이나 아바타 등 극히 제한적인 장식 요소에만 사용. 버튼·카드 배경 등 주요 인터랙티브 요소에는 플랫 단색을 유지한다.
- **새 CSS 변수 임의 생성**: 기존 `:root` 변수 체계에 없는 색상/그림자를 인라인으로 넣지 않는다.
- **인라인 스타일 남용**: 컴포넌트별 `.css` 파일에 스타일을 정의한다. 인라인은 동적 값(계산된 수치)에만 사용.
- **모바일 무시**: desktop-only 레이아웃을 먼저 만들고 "나중에 반응형" 하지 않는다. 모바일 먼저.

### 코드
- **`any` 타입 사용 금지**: 타입을 정확하게 정의한다. `src/types.ts`에 공유 타입을 둔다.
- **Zustand 스토어에 UI 상태 넣지 않기**: 모달 열림/닫힘, 탭 선택 같은 로컬 UI 상태는 `useState`로. 스토어는 게임 로직 상태만. (예외: `gameStore.expandedNews`는 day 전환 시 자동 펼침 로직과 결합되어 있어 스토어에 유지)
- **번역 키 하드코딩 금지**: 유저에게 보이는 모든 텍스트는 `t()` 또는 `LocalizedString`을 거친다. 영어 문자열을 JSX에 직접 넣지 않는다.
- **컴포넌트 파일 비대화**: 하나의 컴포넌트 파일이 500줄을 넘으면 분리를 검토한다.
- **`useEffect` 안에서 게임 로직 실행 금지**: 게임 상태 변경은 반드시 Zustand action을 통해서. `useEffect`는 사이드 이펙트(DOM, 외부 API)에만.
- **`index.css`에 컴포넌트 스타일 추가 금지**: `index.css`는 글로벌 변수와 유틸리티만. 컴포넌트 스타일은 `src/components/{Component}.css`에.

### 데이터
- **뉴스 effect 밸런스 위반 금지**: 위 "Game Balance Rules" 섹션의 모드별 제한을 초과하는 effect 값 사용 금지.
- **시드(seed) 무시 금지**: 게임 시뮬레이션의 랜덤 요소는 반드시 `mulberry32` PRNG을 통해야 한다. `Math.random()` 직접 사용 금지. (예외: `identity.ts`의 UUID 생성 등 게임 결과에 영향 없는 일회성 용도)

## Code Conventions

### 파일 구조
```
src/
  components/     # React 컴포넌트 (.tsx) + 동명의 CSS 파일
  store/          # Zustand stores (gameStore, languageStore, attendanceStore, achievementStore)
  hooks/          # Custom hooks (useAuth, useLiveMarket)
  data/           # 게임 시나리오, 뉴스, 주식 데이터
    advanced/     # 어드밴스 모드 전용 데이터 (stocks, news, arcs)
  i18n/           # translations.ts
  lib/            # 유틸리티 (prng, achievements, identity, supabase 클라이언트 등)
  types.ts        # 공유 타입 정의
```

### 네이밍
- 컴포넌트: PascalCase (`GameOverScreen.tsx`)
- CSS 클래스: kebab-case (`splash-content`, `mode-card`)
- 타입/인터페이스: PascalCase (`StockSymbol`, `DayPrice`)
- Zustand 스토어 훅: `use{Name}Store` 패턴 (`useGameStore`, `useLanguageStore`)
- 번역 키: dot-path (`'market.buy'`, `'app.title'`)

### 컴포넌트 패턴
- Props 타입은 컴포넌트 파일 상단에 인라인 정의 (별도 파일 불필요)
- 이벤트 핸들러: `on{Action}` (props), `handle{Action}` (내부)
- 조건부 렌더링: early return 패턴 사용 (App.tsx의 view 분기 참고)
- 아이콘: lucide-react 사용. 다른 아이콘 라이브러리 추가 금지.

### CSS 패턴
- 미디어 쿼리 브레이크포인트: `768px` (모바일/데스크탑), `480px` (소형 모바일)
- 애니메이션: `@keyframes` 정의 후 CSS 변수 트랜지션으로 적용
- z-index 계층: 모달(1000) > 토스트(999) > 바텀내비(100) > 일반(auto)

## QA Checklist

기능 구현 또는 UI 변경 후 아래를 확인한다:

### 필수 (모든 변경)
- [ ] `pnpm build` 성공 (TypeScript 에러 없음)
- [ ] `pnpm lint` 통과
- [ ] 한국어/영어 전환 시 레이아웃 깨짐 없음
- [ ] 새로 추가한 유저 노출 텍스트가 `translations.ts`에 en/ko 모두 있음

### UI 변경 시
- [ ] 모바일(375px 너비) 기준으로 레이아웃 확인
- [ ] 터치 타겟 44px 이상
- [ ] CSS 변수 시스템 사용 (하드코딩된 색상/그림자 없음)
- [ ] 색상 대비 WCAG AA (4.5:1) 확인
- [ ] 시맨틱 HTML 사용 (`<div onClick>` 대신 `<button>`)
- [ ] 아이콘 버튼에 `aria-label` 적용
- [ ] `prefers-reduced-motion`으로 애니메이션 비활성화 가능
- [ ] 다크 모드 대비: 새 색상은 CSS 변수로만 추가 (하드코딩 금지)

### 게임 로직 변경 시
- [ ] 클래식/어드밴스 모드 모두 플레이 가능
- [ ] 매수 → 보유 → 매도 전체 흐름 정상
- [ ] 잔고 계산 정확 (소수점 처리 포함)
- [ ] Day 진행 → Game Over 화면 도달 확인
- [ ] 시드 결정론 유지: 같은 시드 → 같은 결과

### 성능 변경 시
- [ ] `pnpm build` 후 개별 청크 200kB 미만
- [ ] 스플래시 화면에서 불필요한 라이브러리 로드 없음
