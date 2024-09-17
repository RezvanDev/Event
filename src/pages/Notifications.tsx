// src/pages/Notifications.tsx
import React, { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { getNotifications } from '../api';

type NotificationType = 'Акции' | 'Статус бронирования' | 'Прочее';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  date: string;
}

const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NotificationType>('Акции');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, [activeTab]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await getNotifications();
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotifications = notifications.filter(notification =>
    activeTab === 'Акции' ? true : notification.type === activeTab
  );

  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    if (!groups[notification.date]) {
      groups[notification.date] = [];
    }
    groups[notification.date].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  const handleNotificationClick = (id: string) => {
    navigate(`/notifications/${id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-16">
      <h1 className="text-2xl font-bold p-4">Уведомления</h1>
      <div className="px-4 mb-4">
        <div className="flex space-x-2 rounded-lg bg-white p-1" style={{ border: '1px solid #007AFF' }}>
          {['Акции', 'Статус бронирования', 'Прочее'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out
                ${activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'text-blue-500 hover:bg-blue-50'}`}
              onClick={() => setActiveTab(tab as NotificationType)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4">
        {loading ? (
          <p>Загрузка уведомлений...</p>
        ) : (
          Object.entries(groupedNotifications).map(([date, notifications]) => (
            <div key={date} className="mb-6">
              <h2 className="text-lg font-semibold mb-2">{date}</h2>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="bg-white rounded-lg p-4 mb-2 shadow-sm cursor-pointer"
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{notification.description}</p>
                    </div>
                    <FiChevronRight className="text-blue-500 ml-4" size={24} />
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Notifications;