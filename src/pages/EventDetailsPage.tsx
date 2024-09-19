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
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="flex-grow overflow-y-auto pb-32">
        <div className="relative h-64 bg-blue-500">
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          <button 
            onClick={() => navigate(-1)} 
            className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md"
          >
            <FiArrowLeft size={24} className="text-blue-500" />
          </button>
        </div>
        
        <div className="bg-white rounded-t-3xl -mt-6 p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">{event.title}</h1>
              <p className="text-blue-500 flex items-center">
                <FiMapPin className="mr-1" />
                {event.city}
              </p>
            </div>
            <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
              <FiStar className="w-5 h-5 text-blue-500 mr-1" />
              <span className="font-bold text-lg">{event.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex justify-between mb-6">
            <div className="flex items-center">
              <FiCalendar className="text-blue-500 mr-2" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center">
              <FiTag className="text-blue-500 mr-2" />
              <span>{event.category}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="text-blue-500 mr-2" />
              <span>{event.format}</span>
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

      <div className="fixed bottom-16 left-0 right-0 p-4  shadow-up">
        <button className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-md hover:bg-blue-600 transition duration-300">
          Забронировать за {event.price} ₽
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default EventDetailsPage;