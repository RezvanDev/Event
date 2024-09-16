import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { fetchNotifications, markNotificationAsRead, deleteNotification } from '../api/api';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
    setLoading(false);
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleDeleteNotification = async (id: number) => {
    try {
      await deleteNotification(id);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  if (loading) {
    return <div>Загрузка уведомлений...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen pb-16">
      <h1 className="text-2xl font-bold p-4">Уведомления</h1>
      <div className="px-4">
        {notifications.length === 0 ? (
          <p>У вас нет уведомлений</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg p-4 mb-2 shadow-sm ${notification.isRead ? 'opacity-50' : ''}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{new Date(notification.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex">
                  {!notification.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="text-blue-500 hover:text-blue-600 mr-2"
                    >
                      <FiCheckCircle size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteNotification(notification.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Notifications;