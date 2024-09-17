import React, { useEffect, useState } from 'react';
import api from '../api/api';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string;
        ready: () => void;
      };
    };
  }
}

const TelegramAuth: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initTelegram = async () => {
      if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        const initData = tg.initData;
        if (!initData) {
          setError("No init data available");
          return;
        }
        try {
          const response = await api.post('/auth/telegram-login', { initData });
          console.log('User registered/logged in:', response.data);
          localStorage.setItem('token', response.data.access_token);
        } catch (error) {
          console.error('Registration/Login failed:', error);
          setError("Failed to register/login");
        }
      } else {
        // For testing outside of Telegram WebApp
        console.log("Running outside Telegram WebApp");
        try {
          // You might want to implement a different login mechanism here
          // For now, we'll just set a dummy token
          localStorage.setItem('token', 'dummy-token-for-testing');
        } catch (error) {
          console.error('Test login failed:', error);
          setError("Failed to set test token");
        }
      }
    };

    initTelegram();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return null;
};

export default TelegramAuth;