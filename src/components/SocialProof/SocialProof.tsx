import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useTranslation } from '../../i18n/translations';

interface SocialProofData {
  totalTraders: number;
  avgReturnToday: number | null;
  gamesToday: number;
}

const CACHE_KEY = 'neurotrade-social-proof';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface CachedData {
  data: SocialProofData;
  timestamp: number;
}

function getCached(): SocialProofData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed: CachedData = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function setCache(data: SocialProofData): void {
  try {
    const payload: CachedData = { data, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage errors
  }
}

export default function SocialProof() {
  const [data, setData] = useState<SocialProofData | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const cached = getCached();
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    async function fetch() {
      try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayIso = todayStart.toISOString();

        const [totalRes, todayRes] = await Promise.all([
          supabase.from('rankings').select('id', { count: 'exact', head: true }),
          supabase
            .from('rankings')
            .select('return_pct')
            .gte('created_at', todayIso),
        ]);

        if (totalRes.error || todayRes.error) {
          setLoading(false);
          return;
        }

        const totalTraders = totalRes.count ?? 0;
        const todayRows = todayRes.data ?? [];
        const gamesToday = todayRows.length;
        const avgReturnToday =
          gamesToday > 0
            ? todayRows.reduce((sum, r) => sum + (r.return_pct ?? 0), 0) / gamesToday
            : null;

        const result: SocialProofData = { totalTraders, avgReturnToday, gamesToday };
        setCache(result);
        setData(result);
      } catch {
        // show nothing on error
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, []);

  if (loading || !data) return null;

  const { totalTraders, avgReturnToday, gamesToday } = data;

  const returnStr =
    avgReturnToday !== null
      ? `${avgReturnToday >= 0 ? '+' : ''}${avgReturnToday.toFixed(1)}%`
      : null;

  return (
    <div
      className="social-proof"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
        fontSize: '0.78rem',
        color: 'var(--text-primary)',
        fontWeight: 500,
        opacity: 0.7,
        margin: '0.5rem 0 1rem',
        lineHeight: 1.4,
      }}
    >
      <span>
        🎉 {t('app.socialProofTraders', { count: totalTraders.toLocaleString() })}
      </span>
      {returnStr !== null && (
        <>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>
            {t('app.socialProofAvgReturn', { pct: returnStr })}
          </span>
        </>
      )}
      {gamesToday > 0 && (
        <>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>
            {gamesToday.toLocaleString()} {t('app.socialProofGamesToday')}
          </span>
        </>
      )}
    </div>
  );
}
