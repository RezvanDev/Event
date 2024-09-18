import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

interface NotificationDetailProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

// Это моковые данные. В реальном приложении вы бы получали эти данные из API или хранилища состояния.
const mockNotificationDetails: Record<string, NotificationDetailProps> = {
  '1': {
    id: '1',
    title: 'Специальное предложение',
    description: 'Получите скидку 20% на все концерты в этом месяце! Успейте забронировать билеты по выгодной цене.',
    imageUrl: 'https://example.com/promo-image.jpg'
  },
  '2': {
    id: '2',
    title: 'Статус бронирования изменен',
    description: 'Ваше бронирование на концерт "Рок-фестиваль" подтверждено. Не забудьте прийти за 30 минут до начала мероприятия.',
  },
  '3': {
    id: '3',
    title: 'Новое мероприятие',
    description: 'В нашем приложении появилось новое мероприятие "Джазовый вечер". Успейте купить билеты первыми!',
    imageUrl: 'https://example.com/jazz-event.jpg'
  },
};

const NotificationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const notification = id ? mockNotificationDetails[id] : null;

  if (!notification) {
    return <div>Уведомление не найдено</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className=" text-blue p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4">
          <FiArrowLeft size={24} />
        </button>
        
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">{notification.title}</h2>
        {notification.imageUrl && (
          <img src={notification.imageUrl} alt={notification.title} className="w-full h-48 object-cover rounded-lg mb-4" />
        )}
        <p className="text-gray-700">{notification.description}</p>
      </div>
    </div>
  );
};

export default NotificationDetails;