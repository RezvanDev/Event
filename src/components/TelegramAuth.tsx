import React, { useEffect } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    Telegram: any;
  }
}

const TelegramAuth: React.FC = () => {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();

    const registerUser = async () => {
      const user = tg.initDataUnsafe.user;
      if (user) {
        try {
          const response = await axios.post('/api/auth/register', {
            telegramId: user.id.toString(),
            name: user.first_name + (user.last_name ? ' ' + user.last_name : '')
          });
          console.log('User registered:', response.data);
          // Здесь можно добавить логику для сохранения токена или ID пользователя в локальное хранилище
        } catch (error) {
          console.error('Registration failed:', error);
        }
      }
    };

    registerUser();
  }, []);

  return null; // This component doesn't render anything
};

export default TelegramAuth;