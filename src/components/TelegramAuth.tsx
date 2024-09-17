// src/components/TelegramAuth.tsx
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
        setError("This app is designed to work within Telegram Web App");
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