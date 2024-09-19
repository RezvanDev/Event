import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiStar, FiClock } from 'react-icons/fi';
import BottomNavigation from '../components/BottomNavigation';
import { api, Event } from '../api';

const EventDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [currentImageIndex, ] = useState(0);

  useEffect(() => {
    if (id) {
      fetchEvent(parseInt(id));
    }
  }, [id]);

  const fetchEvent = async (eventId: number) => {
    try {
      const fetchedEvent = await api.getEvent(eventId);
      setEvent(fetchedEvent);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  if (!event) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex-grow overflow-y-auto pb-24">
        <div className="p-4">
          <button onClick={() => navigate(-1)} className="mb-4">
            <FiArrowLeft size={24} />
          </button>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">{event.title}</h1>
              <p className="text-blue-500">{event.city}</p>
            </div>
            <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
              <FiStar className="text-yellow-500 mr-1" />
              <span className="font-bold text-blue-700">{event.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="relative mb-6">
          <div className="aspect-w-16 aspect-h-9 bg-gray-300 rounded-lg overflow-hidden">
            <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="px-4">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-gray-500 text-sm">Категория</p>
              <p className="font-semibold">{event.category}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Формат</p>
              <p className="font-semibold">{event.format}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Тема</p>
             
            </div>
          </div>

          <p className="text-gray-600 mb-6">{event.description}</p>

          <h2 className="text-2xl font-bold mb-3">Место и время</h2>
          <div className="flex items-center mb-2">
            <FiMapPin className="text-blue-500 mr-2" />
            <p>{event.address || 'Адрес не указан'}</p>
          </div>
          <div className="flex items-center mb-4">
            <FiClock className="text-blue-500 mr-2" />
            <p>{event.date}</p>
          </div>
          <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-center h-48 mb-6">
            <p className="text-gray-500">Карта</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white shadow-up">
        <button className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-md hover:bg-blue-600 transition duration-300 flex items-center justify-center">
          <span>К оплате</span>
          <span className="ml-2 bg-white text-blue-500 px-3 py-1 rounded-full text-sm">
            {event.price} ₽
          </span>
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default EventDetailsPage;