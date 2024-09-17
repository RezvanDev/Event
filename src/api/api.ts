import React, { useEffect, useState } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe: {
          user?: {
            id: number;
          };
        };
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

        const user = tg.initDataUnsafe.user;
        if (!user || !user.id) {
          setError("No user data available");
          return;
        }

        try {
          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/telegram-login`, {
            telegramId: user.id.toString()
          }, {
            withCredentials: true
          });
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