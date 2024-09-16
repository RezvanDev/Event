import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { fetchNotificationDetails } from '../api/api';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  createdAt: string;
}

const NotificationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotificationDetails = async () => {
      if (id) {
        try {
          const data = await fetchNotificationDetails(id);
          setNotification(data);
        } catch (error) {
          console.error('Error fetching notification details:', error);
        }
        setLoading(false);
      }
    };

    loadNotificationDetails();
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!notification) {
    return <div>Уведомление не найдено</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="text-blue p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4">
          <FiArrowLeft size={24} />
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">{notification.title}</h2>
        <p className="text-gray-600 mb-2">{notification.createdAt}</p>
        <p className="text-gray-600 mb-4">Тип: {notification.type}</p>
        <p className="text-gray-700">{notification.message}</p>
      </div>
    </div>
  );
};

export default NotificationDetails;