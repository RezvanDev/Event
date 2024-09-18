import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiStar, FiClock } from 'react-icons/fi';
import BottomNavigation from '../components/BottomNavigation';
import { api, Event } from '../api';

const EventDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (id) {
      fetchEvent(parseInt(id));
    }
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.BackButton.show();
      window.Telegram.WebApp.BackButton.onClick(() => navigate(-1));
    }
    return () => {
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.BackButton.hide();
      }
    };
  }, [id, navigate]);

  const fetchEvent = async (eventId: number) => {
    try {
      const fetchedEvent = await api.getEvent(eventId);
      setEvent(fetchedEvent);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  const handleBooking = () => {
    if (event && window.Telegram && window.Telegram.WebApp) {
      api.sendDataToTelegram({
        action: 'book_event',
        eventId: event.id,
        title: event.title,
        price: event.price,
      });
    }
  };

  if (!event) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen flex flex-col text-gray-800 dark:text-white">
      <div className="flex-grow overflow-y-auto pb-24">
        <div className="p-4">
          <button onClick={() => navigate(-1)} className="mb-6 text-blue-500">
            <FiArrowLeft size={24} />
          </button>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-1">{event.title}</h1>
              <p className="text-blue-500">{event.city}</p>
            </div>
            <div className="flex items-center">
              <FiStar className="w-6 h-6 text-yellow-500 mr-1" />
              <span className="font-bold text-xl">{event.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="mb-4 rounded-2xl overflow-hidden bg-blue-500" style={{ height: '200px' }}>
            <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full mx-1 ${i === 0 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-2">О мероприятии</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{event.description}</p>
          <div className="flex mb-6">
            <div className="mr-8">
              <p className="text-blue-500 text-sm">Категория</p>
              <p className="font-semibold">{event.category}</p>
            </div>
            <div>
              <p className="text-blue-500 text-sm">Дата</p>
              <p className="font-semibold flex items-center">
                <FiClock className="mr-1" />
                {event.date}
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Адрес мероприятия</h2>
          <div className="flex items-center mb-4">
            <FiMapPin className="text-blue-500 mr-2" />
            <p>{event.address || 'Адрес не указан'}</p>
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-center" style={{ height: '200px' }}>
            <p className="text-gray-500 dark:text-gray-400">Виджет Яндекс карт</p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-16 left-0 right-0 p-4">
        <button 
          className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold text-lg"
          onClick={handleBooking}
        >
          Забронировать
        </button>
      </div>
      <BottomNavigation />
    </div>
  );
}

export default EventDetailsPage;