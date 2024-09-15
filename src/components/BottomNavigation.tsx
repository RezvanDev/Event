import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBell, FiUser } from 'react-icons/fi';

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around p-2">
        <Link to="/" className={`flex flex-col items-center ${location.pathname === '/' ? 'text-blue-500' : 'text-gray-400'}`}>
          <FiHome className="w-6 h-6" />
          <span className="text-xs">Главная</span>
        </Link>
        <Link to="/notifications" className={`flex flex-col items-center ${location.pathname === '/notifications' ? 'text-blue-500' : 'text-gray-400'}`}>
          <FiBell className="w-6 h-6" />
          <span className="text-xs">Уведомления</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center ${location.pathname === '/profile' ? 'text-blue-500' : 'text-gray-400'}`}>
          <FiUser className="w-6 h-6" />
          <span className="text-xs">Профиль</span>
        </Link>
      </div>
    </nav>
  );
}

export default BottomNavigation;