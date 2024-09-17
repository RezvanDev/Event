import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';
import Notifications from './pages/Notifications';
import NotificationDetails from './components/NotificationDetails';
import { setTelegramUserId } from './api';

const App: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initApp = () => {
      try {
        const telegramUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
        if (telegramUserId) {
          setTelegramUserId(telegramUserId.toString());
          console.log('Telegram User ID set:', telegramUserId);
        } else {
          console.warn('Telegram User ID not found');
          setError('Не удалось получить ID пользователя Telegram');
        }
      } catch (err) {
        console.error('Error initializing app:', err);
        setError('Произошла ошибка при инициализации приложения');
      }
    };

    initApp();
  }, []);

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/notifications/:id" element={<NotificationDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;