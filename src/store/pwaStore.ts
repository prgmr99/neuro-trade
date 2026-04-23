import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BeforeInstallPromptEvent = any;

interface PWAState {
  deferredPrompt: BeforeInstallPromptEvent | null;
  isIOS: boolean;
  isStandalone: boolean;
  hasDismissedInstall: boolean;
  hasPlayedGame: boolean;
  
  setDeferredPrompt: (prompt: BeforeInstallPromptEvent | null) => void;
  dismissInstall: () => void;
  setHasPlayedGame: () => void;
}

// Helper to check iOS
const checkIsIOS = () => {
  if (typeof window === 'undefined') return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

// Helper to check if already installed
const checkIsStandalone = () => {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.navigator as any).standalone ||
    document.referrer.includes('android-app://')
  );
};

export const usePwaStore = create<PWAState>()(
  persist(
    (set) => ({
      deferredPrompt: null,
      isIOS: checkIsIOS(),
      isStandalone: checkIsStandalone(),
      hasDismissedInstall: false,
      hasPlayedGame: false,

      setDeferredPrompt: (prompt) => set({ deferredPrompt: prompt }),
      dismissInstall: () => set({ hasDismissedInstall: true }),
      setHasPlayedGame: () => set({ hasPlayedGame: true }),
    }),
    {
      name: 'pwa-storage',
      // Only persist these specific fields
      partialize: (state) => ({ 
        hasDismissedInstall: state.hasDismissedInstall,
        hasPlayedGame: state.hasPlayedGame
      }),
    }
  )
);
