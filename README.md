# NeuroTrade: A Simulated Financial Trading Game

> **Play now:** [neuro-trade.yeomniverse.com](https://neuro-trade.yeomniverse.com)

NeuroTrade is a web-based educational trading simulator where players analyze fictional news events to predict market movements and manage a digital portfolio over a fixed period.

## Overview

The game challenges players to build their portfolio within a constrained 5-day cycle. Each day, players receive a series of macroeconomic and company-specific news events. By reading these events, players must decipher hidden correlations, formulate a trading strategy, and execute buy or sell orders across a simulated stock market. 

At the end of the simulation, players receive a summary of their final portfolio value and their total return on investment.

## Core Features

*   **News-Driven Market Engine:** Stock prices dynamically react to daily news events (e.g., product launches, government regulations, or supply chain disruptions).
*   **Bilingual Support (i18n):** The application fully supports both English and Korean languages via a seamless in-app toggle, providing localized UI elements, company descriptions, and news content.
*   **Detailed Portfolio Management:** An interactive dashboard allows players to monitor their available cash balance, unrealized returns, and average cost basis for all held assets.
*   **Historical Price Context:** Players can view the generated price history through interactive daily candlestick charts to make informed trading decisions.
*   **Day-End Summaries:** An end-of-day modal details exactly how that day's news impacted the market, providing immediate feedback on trading decisions.
*   **Multiple Game Modes:** Classic mode, Flash Round (single-stock quick decisions), Daily Challenge (seeded daily competitions), Duel Mode (1v1 with shared seeds), and Live Competition (real-time multiplayer).
*   **Global Ranking Board:** Submit scores to a public leaderboard with filtering by game mode.
*   **Achievement System:** Unlock achievements based on trading milestones, streaks, and behaviors.
*   **Daily Attendance:** Check-in streak tracking with reward unlocks.

## Tech Stack

*   **Framework:** React 18 (with Vite)
*   **Language:** TypeScript
*   **State Management:** Zustand (with localStorage persistence)
*   **Backend:** Supabase (rankings, daily challenges, duels, real-time presence)
*   **Styling:** Component-scoped CSS files (modern flat UI, no CSS framework)
*   **Charting:** Recharts (custom candlestick charts via ComposedChart)
*   **Icons:** Lucide-React
*   **URL State Management:** nuqs

## Project Structure

*   **`src/components/`**: Modular React components with co-located CSS files. Core views: `Layout`, `Market`, `Portfolio`, `StockChart`, `NewsFeed`, `DayEndSummary`, `GameOverScreen`. Game modes: `FlashRound`, `DailyChallenge`, `DuelMode`, `LiveCompetition`. Social: `RankingBoard`, `AchievementGallery`, `AttendanceModal`.
*   **`src/store/`**: Zustand stores — `gameStore.ts` (core game engine), `useLanguageStore.ts` (i18n), `achievementStore.ts`, `attendanceStore.ts`.
*   **`src/hooks/`**: Custom hooks — `useAuth.ts` (Supabase anonymous auth), `useLiveMarket.ts` (real-time multiplayer).
*   **`src/i18n/`**: `translations.ts` and `useTranslation` hook for localized strings.
*   **`src/data/`**: Game scenarios, stock profiles, news events, and arc definitions.
*   **`src/lib/`**: Utilities — `supabase.ts`, `identity.ts`, `prng.ts`, `achievements.ts`, `sounds.ts`, `shareText.ts`.
*   **`src/types.ts`**: TypeScript interface definitions.
*   **`src/index.css`**: Global CSS variables, reset, and component CSS imports.
