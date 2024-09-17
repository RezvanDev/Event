import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { getNotification, markNotificationAsRead } from '../api';

interface NotificationDetailProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  date: string;
  isRead: boolean;
  type: string;
}

const NotificationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notification, setNotification] = useState<NotificationDetailProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchNotificationDetails();
    }
  }, [id]);

  const fetchNotificationDetails = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await getNotification(id);
      setNotification(response.data);
      if (!response.data.isRead) {
        await markNotificationAsRead(id);
      }
    } catch (error) {
      console.error('Error fetching notification details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4">Загрузка...</div>;
  }

  if (!notification) {
    return <div className="p-4">Уведомление не найдено</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-blue-500 text-white p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4">
          <FiArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Детали уведомления</h1>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{notification.title}</h2>
        <p className="text-gray-500 mb-4">{notification.date}</p>
        {notification.imageUrl && (
          <img 
            src={notification.imageUrl} 
            alt={notification.title} 
            className="w-full h-48 object-cover rounded-lg mb-4" 
          />
        )}
        <p className="text-gray-700 mb-4">{notification.description}</p>
        <div className="bg-gray-100 p-2 rounded-md">
          <p className="text-sm text-gray-500">Тип: {notification.type}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetails;