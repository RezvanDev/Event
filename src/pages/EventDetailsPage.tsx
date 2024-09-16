import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMapPin } from 'react-icons/fi';
import BottomNavigation from '../components/BottomNavigation';
import { fetchEventDetails } from '../api/api';

const EventDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEventDetails = async () => {
      if (id) {
        try {
          const data = await fetchEventDetails(id);
          setEvent(data);
        } catch (error) {
          console.error('Error fetching event details:', error);
        }
        setLoading(false);
      }
    };

    loadEventDetails();
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!event) {
    return <div>Мероприятие не найдено</div>;
  }

  const handleMapClick = () => {
    // Здесь можно добавить логику для открытия карты в приложении
    console.log('Открытие карты в приложении');
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex-grow overflow-y-auto pb-24">
        <div className="p-4">
          <button onClick={() => navigate(-1)} className="mb-6">
            <FiArrowLeft size={24} />
          </button>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-1">{event.title}</h1>
              <p className="text-blue-500 text-lg">{event.city}</p>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-bold text-xl">{event.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="mb-4 rounded-2xl overflow-hidden bg-blue-500" style={{ height: '200px' }}>
            <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          </div>
          <p className="text-lg font-semibold mb-4">{event.date}</p>
          <h2 className="text-2xl font-bold mb-2">О мероприятии</h2>
          <p className="text-gray-600 mb-6">{event.fullDescription}</p>
          <div className="flex mb-6">
            <div className="mr-8">
              <p className="text-blue-500 text-sm">Категория</p>
              <p className="font-semibold">{event.category}</p>
            </div>
            <div>
              <p className="text-blue-500 text-sm">Формат</p>
              <p className="font-semibold">{event.format}</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Адрес мероприятия</h2>
          <div className="flex items-center mb-4">
            <FiMapPin className="text-blue-500 mr-2" />
            <p>{event.address}</p>
          </div>
          <div 
            className="bg-gray-200 rounded-lg p-4 flex items-center justify-center cursor-pointer" 
            style={{ height: '200px' }}
            onClick={handleMapClick}
          >
            <p className="text-gray-500">Нажмите, чтобы открыть карту</p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-16 left-0 right-0 p-4">
        <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold text-lg">
          {event.price === 0 ? 'Забронировать (Бесплатно)' : `К оплате $${event.price.toFixed(0)}`}
        </button>
      </div>
      <BottomNavigation />
    </div>
  );
}

export default EventDetailsPage;