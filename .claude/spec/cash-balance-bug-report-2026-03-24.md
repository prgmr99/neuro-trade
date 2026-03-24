# Cash Balance Bug Report

**Date:** 2026-03-24
**Reporter:** Claude Code
**Status:** No Bug Found (UX Issue)

---

## Summary

왼쪽 하단 사이드바의 캐시 밸런스가 10,000에서 변하지 않는다는 리포트에 대해 조사했습니다.

## Investigation

### 1. Cash Balance Display (Layout.tsx)

- **사이드바 (데스크톱):** `Layout.tsx:107` — `${portfolio.cash.toFixed(2)}`
- **모바일 헤더:** `Layout.tsx:52` — `${portfolio.cash.toFixed(0)}`
- **포트폴리오 페이지:** `Portfolio.tsx:20` — `${portfolio.cash.toFixed(2)}`

모두 동일한 Zustand store (`useGameStore`)의 `portfolio.cash`를 참조합니다.

### 2. Store Logic (gameStore.ts)

- **buyStock (line 44-65):** `cash: state.portfolio.cash - totalCost` — 새 객체를 생성하여 Zustand가 변경을 감지함
- **sellStock (line 67-89):** `cash: state.portfolio.cash + totalRevenue` — 동일하게 정상 동작
- **setInitialState (line 183-233):** `cash: startingCash` (기본값 10000)

### 3. Root Cause Analysis

**실제 버그는 없습니다.** 그러나 다음 UX 문제가 "버그"로 인식될 수 있습니다:

1. **수량 미입력 상태에서 Buy 버튼 활성화:** 기존 코드에서 `disabled={qty > 0 && portfolio.cash < (qty * stock.price)}` — qty가 0일 때 버튼이 활성화되어 있으나, 클릭 시 store의 `if (quantity <= 0) return state;` 가드에 의해 아무 변화 없음. 사용자는 매수를 시도했지만 아무 반응이 없으므로 잔액이 변하지 않는다고 느낄 수 있음.

2. **거래 완료 피드백 부재:** 기존에는 매수/매도 성공 시 시각적 피드백이 전혀 없어서, 거래가 실제로 체결되었는지 알기 어려웠음.

3. **사이드바 캐시는 데스크톱에서만 보임:** 모바일에서는 상단 헤더에 작게 표시되어 눈에 잘 띄지 않음.

## Resolution

이번 `fix/pr3-review-feedback` 브랜치에서 다음과 같이 개선했습니다:

- **Buy/Sell 모드 토글 도입:** 매수/매도를 명확히 분리
- **거래 정보 바 추가:** 현재 잔고, 최대 매수 가능 수량, 보유 수량 등을 매수/매도 영역에 직접 표시
- **Buy/Sell 버튼 disabled 로직 수정:** qty가 0이거나 잔고 부족 시 명확하게 비활성화
- **토스트 알림 추가:** 거래 성공 시 종목명, 수량, 금액, 잔액을 토스트로 표시
- **사운드 피드백 추가:** 매수/매도 성공 및 에러 시 각각 다른 사운드 재생

## Conclusion

캐시 밸런스 로직 자체에는 버그가 없으며, Zustand store의 상태 변경 및 React 리렌더링이 정상적으로 동작합니다. 근본 원인은 거래 시 피드백 부재 + Buy 버튼의 부적절한 활성화 상태로 인한 **UX 문제**였으며, 이번 개선으로 해결되었습니다.
