# NeuroTrade: A Simulated Financial Trading Game

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
*   **Game Over Screen:** A final summary screen calculates the overall performance and provides a quick option to restart the simulation.

## Tech Stack

*   **Framework:** React 18 (with Vite)
*   **Language:** TypeScript
*   **State Management:** Zustand (Custom lightweight store with localStorage persistence for translations)
*   **Styling:** Custom CSS (Modern, clean, flat UI design without external heavy frameworks)
*   **Charting:** Recharts (Customized to emulate candlestick behavior using ComposedChart and Bar overlays)
*   **Icons:** Lucide-React
*   **URL State Management:** nuqs

## Installation and Setup

### Prerequisites

Ensure you have Node.js and npm installed on your system.

### Running the Project

1.  Clone the repository and navigate to the project directory:

    ```bash
    cd trading-game
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:

    ```bash
    npm run dev
    ```

    The application should now be accessible at `http://localhost:5173` (or your configured Vite port).

### Building for Production

To create an optimized production build, run:

```bash
npm run build
```

This will run the TypeScript compiler and Vite's production build step. The output will be located in the `dist` directory.

## Project Structure

*   **`src/components/`**: Modular React components (`App`, `Layout`, `Market`, `Portfolio`, `StockChart`, `NewsFeed`, `DayEndSummary`, `GameOverScreen`).
*   **`src/store/`**: Contains Zustand stores.
    *   `gameStore.ts`: Handles the core game loop, portfolio logic, day advancement, and news impact calculation.
    *   `useLanguageStore.ts`: Manages the currently selected language state and local persistence.
*   **`src/i18n/`**: Contains `translations.ts` and the custom `useTranslation` hook for resolving localized string values.
*   **`src/data/scenarios.ts`**: The raw data structures containing initial stock profiles, daily news events, and their underlying multipliers affecting the game engine.
*   **`src/types.ts`**: TypeScript interface definitions for Stocks, News, Portfolios, and Game State.
*   **`src/index.css`**: Global stylesheet enforcing the clean, solid color design aesthetic.
