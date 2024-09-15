import React from 'react';
import { useParams } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';

const EventDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // В реальном приложении здесь будет запрос к API для получения данных о событии
  const event = {
    id,
    title: 'Название мероприятия',
    description: 'Подробное описание мероприятия...',
    // Добавьте другие поля по необходимости
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-16">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
        <p className="text-gray-600">{event.description}</p>
        {/* Добавьте дополнительную информацию о мероприятии */}
      </div>
      <BottomNavigation />
    </div>
  );
}

export default EventDetailsPage;