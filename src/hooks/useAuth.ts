import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUserId(session.user.id);
        setIsLoading(false);
      } else {
        supabase.auth.signInAnonymously().then(({ data, error }) => {
          if (error) {
            console.error('Anonymous sign-in failed:', error.message);
          }
          if (data?.user) {
            setUserId(data.user.id);
          }
          setIsLoading(false);
        });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setUserId(session?.user?.id ?? null),
    );

    return () => subscription.unsubscribe();
  }, []);

  return { userId, isLoading };
}
