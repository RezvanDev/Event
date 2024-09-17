import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
          };
        };
        ready: () => void;
      };
    };
  }
}

const TelegramAuth: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      const user = tg.initDataUnsafe.user;
      if (user) {
        setUserId(user.id);
        localStorage.setItem('telegramUserId', user.id.toString());
        console.log('Telegram user authenticated:', user);
      }
    } else {
      console.log("Running outside Telegram WebApp");
      // Для тестирования вне Telegram WebApp
      const testUserId = 12345;
      setUserId(testUserId);
      localStorage.setItem('telegramUserId', testUserId.toString());
    }
  }, []);

  if (!userId) {
    return <div>Loading...</div>;
  }

  return null;
};

export default TelegramAuth;