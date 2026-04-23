import React, { useState, useEffect } from 'react';
import { usePwaStore } from '../../store/pwaStore';
import { useTranslation } from '../../i18n/translations';
import { Download, X, Share } from 'lucide-react';
import './InstallPrompt.css';

const InstallPrompt: React.FC = () => {
  const { t } = useTranslation();
  const { 
    deferredPrompt, 
    isIOS, 
    isStandalone, 
    hasDismissedInstall, 
    hasPlayedGame,
    dismissInstall 
  } = usePwaStore();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if the user has played at least one game
    // and hasn't dismissed the prompt
    // and isn't already running as a standalone app
    if (hasPlayedGame && !hasDismissedInstall && !isStandalone) {
      // For Android, we need the deferredPrompt to be available
      if (!isIOS && deferredPrompt) {
        setIsVisible(true);
      } 
      // For iOS, we can show the custom guide
      else if (isIOS) {
        setIsVisible(true);
      }
    } else {
      setIsVisible(false);
    }
  }, [hasPlayedGame, hasDismissedInstall, isStandalone, deferredPrompt, isIOS]);

  if (!isVisible) return null;

  const handleInstallClick = async () => {
    if (!isIOS && deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User ${outcome} the A2HS prompt`);
      
      // We've used the prompt, and can't use it again, so hide it
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    dismissInstall();
  };

  return (
    <div className="install-prompt-overlay">
      <div className="install-prompt-modal glass-card">
        <button className="install-prompt-close" onClick={handleDismiss}>
          <X size={20} />
        </button>
        
        <div className="install-prompt-content">
          <div className="install-prompt-icon-wrapper">
            <img src="/icon-192.png" alt="NeuroTrade Icon" className="install-prompt-icon" />
          </div>
          
          <h3 className="install-prompt-title">{t('pwa.installTitle')}</h3>
          <p className="install-prompt-desc">{t('pwa.installDesc')}</p>
          
          {isIOS ? (
            <div className="ios-install-guide">
              <p>{t('pwa.iosGuide')}</p>
              <div className="ios-icons-demo">
                <Share size={24} className="demo-icon" />
                <span className="demo-arrow">→</span>
                <div className="demo-plus-box">+</div>
              </div>
            </div>
          ) : (
            <button className="install-prompt-btn" onClick={handleInstallClick}>
              <Download size={18} />
              {t('pwa.installBtn')}
            </button>
          )}
          
          <button className="install-prompt-dismiss-text" onClick={handleDismiss}>
            {t('pwa.dismiss')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
