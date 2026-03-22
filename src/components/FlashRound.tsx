import { useState, useEffect, useCallback } from 'react';
import { mulberry32 } from '../lib/prng';
import { FLASH_SCENARIOS, FlashScenario } from '../data/flash';
import { useAchievementStore } from '../store/achievementStore';
import { useTranslation } from '../i18n/translations';
import { generateFlashShareText } from '../lib/shareText';

interface Props {
  onBack: () => void;
}

type Phase = 'ready' | 'playing' | 'result';
type Choice = 'allin' | 'pass' | null;

const TIMER_SECONDS = 60;

function pickScenario(): FlashScenario {
  const rng = mulberry32(Date.now());
  const idx = Math.floor(rng() * FLASH_SCENARIOS.length);
  return FLASH_SCENARIOS[idx];
}

function applyNoise(effect: number, volatility: number): number {
  const rng = mulberry32(Date.now() ^ 0xdeadbeef);
  // noise in range [1 - volatility, 1 + volatility]
  const noise = 1 + (rng() - 0.5) * volatility;
  return effect * noise;
}

export default function FlashRound({ onBack }: Props) {
  const { language } = useTranslation();
  const { flashWins, flashWinStreak, flashMaxWinStreak, totalFlashGames, recordFlashResult } =
    useAchievementStore();

  const [phase, setPhase] = useState<Phase>('ready');
  const [scenario, setScenario] = useState<FlashScenario | null>(null);
  const [choice, setChoice] = useState<Choice>(null);
  const [finalMultiplier, setFinalMultiplier] = useState<number>(1);
  const [won, setWon] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_SECONDS);
  const [newsRevealed, setNewsRevealed] = useState<boolean>(false);
  const [copyLabel, setCopyLabel] = useState<'idle' | 'copied'>('idle');

  // Timer effect
  useEffect(() => {
    if (phase !== 'playing') return;
    if (timeLeft <= 0) {
      // Time ran out — treat as PASS
      handleChoice('pass');
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, timeLeft]);

  // Reveal news with a short delay after playing starts
  useEffect(() => {
    if (phase !== 'playing') return;
    setNewsRevealed(false);
    const id = setTimeout(() => setNewsRevealed(true), 400);
    return () => clearTimeout(id);
  }, [phase]);

  const handleFlashShare = useCallback(async () => {
    if (!scenario || choice === null) return;
    const resultPct = (finalMultiplier - 1) * 100;
    const text = generateFlashShareText({
      stockSymbol: scenario.stock.symbol,
      choice,
      resultPct,
      won,
      streak: flashWinStreak,
      language,
    });

    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // Fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopyLabel('copied');
      setTimeout(() => setCopyLabel('idle'), 2000);
    } catch {
      // Clipboard unavailable — silently ignore
    }
  }, [scenario, choice, finalMultiplier, won, flashWinStreak, language]);

  const startRound = useCallback(() => {
    const s = pickScenario();
    setScenario(s);
    setChoice(null);
    setTimeLeft(TIMER_SECONDS);
    setPhase('playing');
  }, []);

  const handleChoice = useCallback(
    (c: 'allin' | 'pass') => {
      if (!scenario || phase !== 'playing') return;
      setPhase('result');

      const actualMultiplier = applyNoise(scenario.news.effect, scenario.stock.volatility);
      setFinalMultiplier(actualMultiplier);
      setChoice(c);

      const priceWentUp = actualMultiplier > 1;
      const playerWon = c === 'allin' ? priceWentUp : !priceWentUp;
      setWon(playerWon);
      recordFlashResult(playerWon);
    },
    [scenario, phase, recordFlashResult]
  );

  const movePct = ((finalMultiplier - 1) * 100).toFixed(1);
  const isPositive = finalMultiplier > 1;

  const labels = {
    flashRound: language === 'ko' ? '플래시 라운드' : 'Flash Round',
    tagline: language === 'ko' ? '한 종목, 한 뉴스, 단 하나의 선택.' : 'One stock. One news. One decision.',
    start: language === 'ko' ? '시작하기' : 'Start',
    back: language === 'ko' ? '메인으로' : 'Back to Menu',
    playAgain: language === 'ko' ? '다시 하기' : 'Play Again',
    wins: language === 'ko' ? '승' : 'Wins',
    losses: language === 'ko' ? '패' : 'Losses',
    streak: language === 'ko' ? '연승' : 'Streak',
    best: language === 'ko' ? '최고 연승' : 'Best',
    played: language === 'ko' ? '총 판수' : 'Played',
    allIn: language === 'ko' ? '전부 투자' : 'ALL IN',
    pass: language === 'ko' ? '패스' : 'PASS',
    timeLeft: language === 'ko' ? '남은 시간' : 'Time Left',
    youGained: language === 'ko' ? '수익 획득!' : 'You gained!',
    youLost: language === 'ko' ? '손실 발생' : 'You lost',
    stockMoved: language === 'ko' ? '주가 변동' : 'Stock moved',
    passed: language === 'ko' ? '패스함' : 'You passed',
    win: language === 'ko' ? '승리!' : 'WIN!',
    lose: language === 'ko' ? '패배' : 'LOSE',
    currentPrice: language === 'ko' ? '현재가' : 'Price',
    finalPrice: language === 'ko' ? '최종가' : 'Final',
  };

  // ---- READY PHASE ----
  if (phase === 'ready') {
    const losses = totalFlashGames - flashWins;
    return (
      <div className="flash-overlay">
        <div className="flash-card glass-card">
          <button className="flash-back-btn" onClick={onBack}>
            ← {labels.back}
          </button>

          <div className="flash-ready-header">
            <span className="flash-badge">⚡</span>
            <h1 className="flash-title">{labels.flashRound}</h1>
            <p className="flash-tagline">{labels.tagline}</p>
          </div>

          <div className="flash-stats-row">
            <div className="flash-stat">
              <span className="flash-stat-value">{totalFlashGames}</span>
              <span className="flash-stat-label">{labels.played}</span>
            </div>
            <div className="flash-stat">
              <span className="flash-stat-value flash-stat-win">{flashWins}</span>
              <span className="flash-stat-label">{labels.wins}</span>
            </div>
            <div className="flash-stat">
              <span className="flash-stat-value flash-stat-lose">{losses}</span>
              <span className="flash-stat-label">{labels.losses}</span>
            </div>
            <div className="flash-stat">
              <span className="flash-stat-value flash-stat-streak">{flashWinStreak}</span>
              <span className="flash-stat-label">{labels.streak}</span>
            </div>
            <div className="flash-stat">
              <span className="flash-stat-value">{flashMaxWinStreak}</span>
              <span className="flash-stat-label">{labels.best}</span>
            </div>
          </div>

          <button className="flash-start-btn" onClick={startRound}>
            {labels.start}
          </button>
        </div>
      </div>
    );
  }

  // ---- PLAYING PHASE ----
  if (phase === 'playing' && scenario) {
    const urgency = timeLeft <= 10;
    return (
      <div className="flash-overlay">
        <div className="flash-card glass-card">
          {/* Timer */}
          <div className={`flash-timer ${urgency ? 'flash-timer-urgent' : ''}`}>
            <div
              className="flash-timer-bar"
              style={{ width: `${(timeLeft / TIMER_SECONDS) * 100}%`, background: urgency ? 'var(--positive)' : 'var(--accent-color)' }}
            />
            <span className="flash-timer-label">{timeLeft}s</span>
          </div>

          {/* Stock info */}
          <div className="flash-stock-info">
            <span className="flash-symbol">{scenario.stock.symbol}</span>
            <span className="flash-stock-name">{scenario.stock.name[language]}</span>
            <span className="flash-price">${scenario.stock.price.toFixed(2)}</span>
          </div>

          {/* News */}
          <div className={`flash-news-card ${newsRevealed ? 'flash-news-revealed' : ''}`}>
            <div className="flash-news-label">📰 BREAKING</div>
            <h2 className="flash-news-title">{scenario.news.title[language]}</h2>
            <p className="flash-news-content">{scenario.news.content[language]}</p>
          </div>

          {/* Choice buttons */}
          <div className="flash-choice-row">
            <button
              className="flash-btn flash-btn-allin"
              onClick={() => handleChoice('allin')}
            >
              {labels.allIn}
            </button>
            <button
              className="flash-btn flash-btn-pass"
              onClick={() => handleChoice('pass')}
            >
              {labels.pass}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- RESULT PHASE ----
  if (phase === 'result' && scenario) {
    const basePrice = scenario.stock.price;
    const endPrice = basePrice * finalMultiplier;
    const pctNum = parseFloat(movePct);

    return (
      <div className={`flash-overlay flash-result-overlay ${won ? 'flash-overlay-win' : 'flash-overlay-lose'}`}>
        <div className="flash-card glass-card">
          {/* Outcome banner */}
          <div className={`flash-outcome-banner ${won ? 'flash-outcome-win' : 'flash-outcome-lose'}`}>
            <span className="flash-outcome-icon">{won ? '🏆' : '📉'}</span>
            <span className="flash-outcome-label">{won ? labels.win : labels.lose}</span>
            {flashWinStreak > 1 && won && (
              <span className="flash-streak-badge">{flashWinStreak} {labels.streak}!</span>
            )}
          </div>

          {/* Stock info */}
          <div className="flash-stock-info">
            <span className="flash-symbol">{scenario.stock.symbol}</span>
            <span className="flash-stock-name">{scenario.stock.name[language]}</span>
          </div>

          {/* Price movement */}
          <div className="flash-price-result">
            <div className="flash-price-row">
              <span className="flash-price-label">{labels.currentPrice}</span>
              <span className="flash-price-value">${basePrice.toFixed(2)}</span>
            </div>
            <div className="flash-price-arrow">{isPositive ? '↑' : '↓'}</div>
            <div className="flash-price-row">
              <span className="flash-price-label">{labels.finalPrice}</span>
              <span className="flash-price-value">${endPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Big percentage */}
          <div
            className="flash-big-pct"
            style={{ color: isPositive ? 'var(--positive)' : 'var(--negative)' }}
          >
            {isPositive ? '+' : ''}{pctNum.toFixed(1)}%
          </div>

          {/* Narrative */}
          <div className="flash-narrative">
            {choice === 'allin' ? (
              isPositive ? (
                <p>{labels.youGained} <strong>+{pctNum.toFixed(1)}%</strong></p>
              ) : (
                <p>{labels.youLost} <strong>{pctNum.toFixed(1)}%</strong></p>
              )
            ) : (
              <p>{labels.passed} — {labels.stockMoved} <strong>{isPositive ? '+' : ''}{pctNum.toFixed(1)}%</strong></p>
            )}
          </div>

          {/* News recap */}
          <div className="flash-result-news">
            <p className="flash-result-news-title">{scenario.news.title[language]}</p>
          </div>

          {/* Actions */}
          <div className="flash-result-actions">
            <button className="flash-start-btn" onClick={startRound}>
              {labels.playAgain}
            </button>
            <button
              onClick={handleFlashShare}
              style={{
                background: 'transparent',
                border: '1.5px solid var(--accent-color)',
                color: 'var(--accent-color)',
                borderRadius: '12px',
                padding: '0.6rem 1.2rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                width: '100%',
              }}
            >
              {copyLabel === 'copied'
                ? (language === 'ko' ? '복사됨! ✓' : 'Copied! ✓')
                : (language === 'ko' ? '결과 공유하기' : 'Copy Results')}
            </button>
            <button className="flash-back-link" onClick={onBack}>
              {labels.back}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
