import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TelegramAuth from './components/TelegramAuth';
import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';
import Notifications from './pages/Notifications';
import NotificationDetails from './components/NotificationDetails';

const App: React.FC = () => {
  return (
    <Router>
      <TelegramAuth />
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