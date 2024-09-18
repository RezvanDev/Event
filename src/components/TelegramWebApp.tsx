import React, { useEffect } from 'react';

declare global {
  interface Window {
    Telegram: {
      WebApp: any;
    };
  }
}

interface TelegramWebAppProps {
  children: React.ReactNode;
}

const TelegramWebApp: React.FC<TelegramWebAppProps> = ({ children }) => {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
  }, []);

  return <>{children}</>;
};

export default TelegramWebApp;