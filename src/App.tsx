import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';
import Notifications from './pages/Notifications';
import NotificationDetails from './components/NotificationDetails';
import { setTelegramUserId } from './api';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
          };
        };
      };
    };
  }
}

const App: React.FC = () => {
  useEffect(() => {
    const telegramUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
    if (telegramUserId) {
      setTelegramUserId(telegramUserId.toString());
      console.log('Telegram User ID set:', telegramUserId);
    } else {
      console.warn('Telegram User ID not found');
    }
  }, []);

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