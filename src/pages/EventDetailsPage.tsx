import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiStar, FiClock, FiCalendar, FiTag } from 'react-icons/fi';
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
      <div className="flex-grow overflow-y-auto pb-32">
        <div className="relative">
          <div className="h-72 bg-gradient-to-b from-blue-400 to-blue-600 overflow-hidden">
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            />
          </div>
          <div className="absolute top-0 left-0 right-0 p-6">
            <button 
              onClick={() => navigate(-1)} 
              className="bg-white/30 backdrop-blur-sm p-2 rounded-full shadow-lg"
            >
              <FiArrowLeft size={24} className="text-white" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
            <h1 className="text-4xl font-bold text-white mb-2 leading-tight">{event.title}</h1>
            <div className="flex items-center text-white/90">
              <FiMapPin className="mr-2" />
              <span>{event.city}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
              <FiStar className="w-5 h-5 text-blue-500 mr-1" />
              <span className="font-bold text-lg text-blue-700">{event.rating.toFixed(1)}</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{event.price} ₽</div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-3">
              <FiCalendar className="text-blue-500 mb-1" size={20} />
              <span className="text-sm text-center">{event.date}</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-3">
              <FiTag className="text-blue-500 mb-1" size={20} />
              <span className="text-sm text-center">{event.category}</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-3">
              <FiClock className="text-blue-500 mb-1" size={20} />
              <span className="text-sm text-center">{event.format}</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-3">О мероприятии</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>

          <h2 className="text-2xl font-bold mb-3">Адрес мероприятия</h2>
          <div className="flex items-center mb-4">
            <FiMapPin className="text-blue-500 mr-2" />
            <p>{event.address || 'Адрес не указан'}</p>
          </div>
          <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-center h-48 mb-6">
            <p className="text-gray-500">Виджет Яндекс карт</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white shadow-up">
        <button className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-md hover:bg-blue-600 transition duration-300">
          Забронировать
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default EventDetailsPage;