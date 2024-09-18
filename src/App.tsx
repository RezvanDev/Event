import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TelegramWebApp from './components/TelegramWebApp';
import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';
import Notifications from './pages/Notifications';
import NotificationDetails from './components/NotificationDetails';

const App: React.FC = () => {
  return (
    <TelegramWebApp>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/notifications/:id" element={<NotificationDetails />} />
        </Routes>
      </Router>
    </TelegramWebApp>
  );
}

export default App;