# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (Vite, default port 5173)
- **Build:** `npm run build` (runs `tsc -b && vite build`, output in `dist/`)
- **Lint:** `npm run lint` (ESLint)
- **Preview production build:** `npm run preview`

No test framework is configured.

## Architecture

NeuroTrade is a single-page React 18 + TypeScript trading simulation game. Players analyze fictional news over a 5-day cycle to trade stocks and maximize portfolio returns. Supports English and Korean (i18n).

### State Management

Two Zustand stores drive the app:

- **`src/store/gameStore.ts`** — Core game state: portfolio (cash + holdings), stocks with live prices, day progression, and news. The `nextDay()` action is the game engine — it applies news effects as price multipliers with random volatility noise, generates candlestick OHLC data, and advances the day counter. All buy/sell logic uses average cost basis accounting.
- **`src/store/useLanguageStore.ts`** — Language preference (`en`/`ko`), persisted to localStorage via Zustand's `persist` middleware.

### i18n System

`src/i18n/translations.ts` contains all UI strings in a nested object keyed by language. The `useTranslation()` hook provides a `t()` function that resolves dot-path keys (e.g., `'market.buy'`) with optional `{placeholder}` interpolation. Stock names, descriptions, and news content use `LocalizedString` (`Record<'en' | 'ko', string>`) directly on the data objects rather than the translation system.

### Game Data

`src/data/scenarios.ts` defines the static game content: 5 stocks (`TECH`, `ECOM`, `GREEN`, `HEALTH`, `AERO`) with base prices and volatility, plus 25 news events (5 per day) each with price effect multipliers. On game init, `setInitialState()` generates synthetic price history for days -5 to 0 so charts have data from the start.

### Key Patterns

- URL state managed via `nuqs` (wrapped in `NuqsAdapter` at root)
- All styling is custom CSS in `src/index.css` — no CSS framework
- Candlestick charts built with Recharts `ComposedChart` + Bar overlays
- PWA support via `public/manifest.json`
- Game flow: splash screen → 5-day trading loop → game over screen, controlled by `App.tsx` state
