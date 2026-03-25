# NeuroTrade 모바일 UX 개선 스펙

> 기준: 토스(Toss) 디자인 — 직관적, 심플, 한 손 조작 최적화
> 분석 날짜: 2026-03-25

---

## 분석 요약

현재 NeuroTrade는 토스 스타일 컬러 시스템(파란색 accent, 빨강/파랑 등락)을 잘 적용하고 있으나,
**모바일 환경에서의 터치 사용성, 정보 밀도, 인터랙션 피드백**에 개선이 필요합니다.

### 현재 잘 되어 있는 점
- 토스 컬러 시스템 (--accent-color, --positive, --negative)
- 모바일 바텀 내비게이션 패턴
- safe-area-inset-bottom 적용
- 100dvh 사용 (모바일 뷰포트 대응)
- 모바일에서 hover 애니메이션 비활성화 (news-card, stock-card)
- 바텀시트 모달 패턴 (모바일)

---

## CRITICAL — 반드시 수정

### 1. 터치 타겟 크기 미달 (44px 미만 요소들)

**문제**: 여러 인터랙티브 요소가 Apple HIG 최소 기준 44x44pt에 미달

| 요소 | 현재 크기 | 위치 |
|------|-----------|------|
| `.splash-lang-btn` | padding 0.4rem 0.8rem (~32px 높이) | App.tsx 스플래시 |
| `.splash-chip` | padding 0.3rem 0.6rem (~28px 높이) | App.tsx 하단 링크 |
| `.mobile-lang-btn` | padding 0.25rem 0.5rem (~26px 높이) | Layout 모바일 헤더 |
| `.preset-btn` | min-height 36px | Market 거래 프리셋 |
| `.chart-toggle-btn` | padding 0.5rem 0.75rem (~34px 높이) | Market 차트 토글 |
| `.expand-btn` | padding 0.5rem 1rem (~34px 높이) | NewsFeed 펼치기 |
| `.read-more` | 28x28px | NewsFeed 더보기 아이콘 |
| `.ranking-filter-btn` | padding 0.5rem 1.25rem (~34px 높이) | RankingBoard 필터 |

**수정 방향**:
```css
/* 모든 인터랙티브 요소에 최소 44px 높이 보장 */
min-height: 44px;
/* 또는 시각적 크기가 작아야 하는 경우 투명 hit area 확장 */
padding: calc((44px - 실제높이) / 2) 기존패딩;
```

### 2. 숫자 입력 키보드 미최적화

**문제**: `Market.tsx`의 거래 수량 input이 `type="number"`만 사용. iOS에서 기본 숫자 키패드가 아닌 전체 키보드가 뜰 수 있음.

**수정** (`Market.tsx:187`):
```tsx
<input
  type="number"
  inputMode="numeric"  // 추가
  pattern="[0-9]*"     // 추가 — iOS 숫자 키패드 트리거
  min="0"
  ...
/>
```

### 3. 거래 입력 필드 너비 부족

**문제**: 모바일에서 `.trade-controls input` 너비가 60px로, 터치로 정확히 탭하기 어렵고 3자리 이상 숫자 입력 시 가독성 저하.

**수정**:
```css
/* 모바일 */
.trade-controls input {
  width: 80px;      /* 60px → 80px */
  min-height: 44px; /* 터치 타겟 보장 */
  font-size: 1rem;  /* 0.9rem → 1rem (iOS auto-zoom 방지: 16px 이상) */
}
```

---

## HIGH — 사용성 크게 영향

### 4. 스플래시 화면 스크롤 불가 문제

**문제**: `.splash-screen`이 `height: 100vh`로 고정되어 있어, 콘텐츠가 뷰포트를 초과하면 (작은 화면, 모드 선택 + instructions 표시 시) 하단 시작 버튼이 잘림.

**수정**:
```css
.splash-screen {
  min-height: 100vh;     /* height → min-height */
  min-height: 100dvh;    /* dvh 우선 */
  overflow-y: auto;      /* 추가 */
  padding: 1rem 0;       /* 추가 — 상하 여백 */
}
```

### 5. 포트폴리오 테이블 → 카드 레이아웃 전환

**문제**: 모바일에서 테이블이 `min-width: 520px`으로 가로 스크롤 필요. 토스는 테이블 대신 **카드형 리스트**를 사용.

**수정 방향**: 768px 이하에서 테이블을 숨기고, 종목별 카드 리스트로 표시.
```
각 카드:
┌─────────────────────────────┐
│ TECH        현재가 $142.50  │
│ 10주 보유   평균 $130.00    │
│           수익률 +9.62%     │
└─────────────────────────────┘
```

### 6. 탭 피드백(Press Feedback) 부재

**문제**: 터치 시 시각적 피드백이 거의 없음. 토스는 모든 터치 가능 요소에 press 시 opacity 또는 scale 변화를 줌.

**수정**:
```css
/* 모든 버튼과 카드에 active 피드백 */
.mode-card:active,
.stock-card:active,
.news-card:active,
.bottom-nav-item:active,
.preset-btn:active:not(:disabled),
.trade-action-btn:active,
.start-btn:active:not(:disabled) {
  transform: scale(0.97);
  opacity: 0.85;
  transition: transform 0.1s, opacity 0.1s;
}
```

### 7. 모달 바텀시트에 드래그 핸들 없음

**문제**: 모바일 모달이 바텀시트 형태지만 닫기 affordance가 불명확. 토스는 상단에 드래그 핸들(pill) 표시.

**수정**: 모바일 모달 상단에 핸들 추가
```css
.modal-content::before {
  content: '';
  display: block;
  width: 36px;
  height: 4px;
  background: var(--text-secondary);
  opacity: 0.3;
  border-radius: 2px;
  margin: 0 auto 1rem;
}
```

### 8. 토스트 위치 — 모바일에서 노치/Dynamic Island 충돌

**문제**: `.trade-toast-container`가 `top: 16px; right: 16px`로 고정. iPhone 노치/Dynamic Island 영역과 겹칠 수 있음.

**수정**:
```css
@media (max-width: 768px) {
  .trade-toast-container {
    top: auto;
    bottom: calc(80px + env(safe-area-inset-bottom)); /* 바텀 내비 위 */
    right: 1rem;
    left: 1rem;
  }

  .trade-toast {
    max-width: 100%;
    min-width: 0;
  }
}
```

---

## MEDIUM — 품질 향상

### 9. 바텀 내비 라벨 크기

**문제**: `.bottom-nav-item` 폰트 0.65rem(~10.4px), 480px 이하에서 0.6rem(~9.6px). 가독성 떨어짐.

**수정**: 최소 0.7rem(~11.2px) 유지. 토스 바텀탭은 약 10-11pt 사용.
```css
.bottom-nav-item { font-size: 0.7rem; }
@media (max-width: 480px) {
  .bottom-nav-item { font-size: 0.65rem; }  /* 0.6rem → 0.65rem */
}
```

### 10. 한국어 폰트 최적화

**문제**: Outfit은 라틴 전용 폰트. 한국어 텍스트는 시스템 폰트로 폴백되어 font-weight, letter-spacing이 일관되지 않음.

**수정**:
```css
body {
  font-family: 'Outfit', 'Pretendard', -apple-system, BlinkMacSystemFont,
               'Apple SD Gothic Neo', sans-serif;
}
```
또는 Pretendard 웹폰트 추가 (토스가 사용하는 폰트 계열).

### 11. touch-action: manipulation 미적용

**문제**: 모바일 웹에서 300ms 탭 딜레이가 발생할 수 있음.

**수정**:
```css
button, a, [role="button"], input, .news-card, .mode-card, .stock-card {
  touch-action: manipulation;
}
```

### 12. 차트 터치 인터랙션

**문제**: `StockChart.tsx`의 Recharts 툴팁이 hover 기반. 모바일에서는 탭해야 툴팁이 뜨지만, 탭 후 사라지지 않는 등 UX가 불안정.

**수정 방향**: 차트 영역에 `touch-action: pan-y`를 적용하여 세로 스크롤은 유지하면서, 가로 드래그로 데이터 포인트 탐색 가능하게 함.

### 13. 거래 패널 개선 — 토스 스타일 바텀시트

**문제**: 현재 거래 패널이 카드 내부에 인라인으로 펼쳐지는데, 모바일에서는 공간이 부족하고 스크롤이 길어짐.

**수정 방향** (선택적): 모바일에서 거래 패널을 하프시트(바텀시트)로 전환.
- Buy/Sell 버튼 탭 → 바텀시트 올라옴
- 프리셋 + 수량 입력 + 확인 버튼이 시트 안에
- 한 손으로 조작 가능한 영역에 모든 컨트롤 배치

### 14. 스크롤 위치 보존

**문제**: 탭 전환 시 스크롤 위치가 초기화됨. 뉴스 → 마켓 → 뉴스로 돌아오면 다시 맨 위.

**수정 방향**: 각 탭의 scrollTop을 state로 저장하고, 탭 전환 시 복원.

### 15. prefers-reduced-motion 지원 부족

**문제**: fadeIn 애니메이션에만 부분적으로 적용. trade-panel-in, 토스트 슬라이드 등에는 미적용.

**수정**:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## LOW — 디테일 개선

### 16. 숫자 탭 레이아웃 시프트 방지

**현황**: `font-variant-numeric: tabular-nums`가 `.mobile-cash`에만 적용됨.

**수정**: 가격, 수익률, 잔액 등 모든 숫자 표시 요소에 적용.
```css
.price-tag, .summary-card .value, .ranking-return, .ranking-value,
.trade-info-value, .holding-info span {
  font-variant-numeric: tabular-nums;
}
```

### 17. 스플래시 화면 모드 카드에 아이콘 추가

**현재**: 텍스트만으로 모드 구분. 토스는 아이콘 + 텍스트 조합으로 빠른 인지 지원.

**수정 방향**: 각 모드 카드에 Lucide 아이콘 추가 (Classic → TrendingUp, Advanced → BarChart3 등).

### 18. 빈 상태(Empty State) 개선

**현재**: 포트폴리오 빈 상태가 텍스트만 표시.

**수정 방향**: 토스 스타일로 일러스트 또는 아이콘 + 안내 텍스트 + CTA 버튼 (마켓으로 이동).

---

## 구현 우선순위

| 순위 | 항목 | 영향도 | 난이도 | 변경 범위 |
|------|------|--------|--------|-----------|
| 1 | #1 터치 타겟 44px | CRITICAL | 낮음 | CSS only |
| 2 | #2 숫자 키보드 | CRITICAL | 낮음 | Market.tsx |
| 3 | #3 입력 필드 너비 | CRITICAL | 낮음 | CSS only |
| 4 | #6 탭 피드백 | HIGH | 낮음 | CSS only |
| 5 | #11 touch-action | HIGH | 낮음 | CSS only |
| 6 | #4 스플래시 스크롤 | HIGH | 낮음 | CSS only |
| 7 | #7 드래그 핸들 | HIGH | 낮음 | CSS only |
| 8 | #8 토스트 위치 | HIGH | 낮음 | CSS only |
| 9 | #9 바텀 내비 라벨 | MEDIUM | 낮음 | CSS only |
| 10 | #15 reduced-motion | MEDIUM | 낮음 | CSS only |
| 11 | #16 tabular-nums | LOW | 낮음 | CSS only |
| 12 | #10 한국어 폰트 | MEDIUM | 낮음 | CSS only |
| 13 | #5 포트폴리오 카드 | HIGH | 중간 | Portfolio.tsx + CSS |
| 14 | #14 스크롤 보존 | MEDIUM | 중간 | Layout.tsx |
| 15 | #13 거래 바텀시트 | MEDIUM | 높음 | Market.tsx + CSS |
| 16 | #12 차트 터치 | MEDIUM | 중간 | StockChart.tsx |
| 17 | #17 모드 카드 아이콘 | LOW | 낮음 | App.tsx |
| 18 | #18 빈 상태 개선 | LOW | 낮음 | Portfolio.tsx |

---

## Phase 1: CSS-Only 개선 (즉시 적용 가능)

항목 #1, #3, #4, #6, #7, #8, #9, #10, #11, #15, #16 — CSS 변경만으로 해결.
단일 파일(`src/index.css`) 수정으로 대부분의 모바일 UX 이슈 해결 가능.

## Phase 2: 컴포넌트 수정

항목 #2 (Market.tsx input 속성), #5 (Portfolio 카드 레이아웃), #14 (스크롤 보존), #17, #18

## Phase 3: 구조 개선

항목 #13 (거래 바텀시트), #12 (차트 터치)
