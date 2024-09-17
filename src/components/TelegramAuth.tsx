import React, { useEffect, useState } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    Telegram?: any;
  }
}

const TelegramAuth: React.FC = () => {
  const [isWebApp, setIsWebApp] = useState(false);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      setIsWebApp(true);
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
          } catch (error) {
            console.error('Registration failed:', error);
          }
        }
      };

      registerUser();
    } else {
      console.log("This is not a Telegram Web App");
    }
  }, []);

  if (!isWebApp) {
    return <div>This app is designed to work within Telegram Web App.</div>;
  }

  return null;
};

export default TelegramAuth;