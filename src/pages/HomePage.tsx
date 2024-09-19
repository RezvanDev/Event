import React, { useState, useEffect } from 'react';
import { FiGrid, FiUsers, FiMusic, FiMic, FiImage, FiSearch, FiMapPin } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import BottomNavigation from '../components/BottomNavigation';
import { api, Event } from '../api';

const categories = [
  { name: 'Все', Icon: FiGrid },
  { name: 'Детям', Icon: FiUsers },
  { name: 'Концерты', Icon: FiMusic },
  { name: 'Стендап', Icon: FiMic },
  { name: 'Выставки', Icon: FiImage },
];

const cities = ['Москва', 'Ташкент', 'Самарканд', 'Алматы', 'Астана'];

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedCity, setSelectedCity] = useState('Москва');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, [selectedCategory, selectedCity]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const category = selectedCategory === 'Все' ? undefined : selectedCategory;
      console.log('Fetching events with params:', { category, city: selectedCity });
      const fetchedEvents = await api.getEvents(category, selectedCity);
      console.log('Fetched events:', fetchedEvents);
      if (Array.isArray(fetchedEvents)) {
        setEvents(fetchedEvents);
      } else {
        console.error('Unexpected response format:', fetchedEvents);
        setError('Получен неверный формат данных от сервера');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Не удалось загрузить мероприятия. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEvents = Array.isArray(events) 
    ? events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleEventDetailsClick = (id: number) => {
    navigate(`/event/${id}`);
  };


  return (
    <div className="bg-gray-100 min-h-screen pb-16">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">MeetBooking</h1>
          <div className="relative">
            <FiMapPin className="absolute left-3 top-3 text-gray-400" />
            <select
              className="bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="bg-white p-4 shadow-md">
        <div className="container mx-auto relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск мероприятий"
            className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white shadow-md mb-4">
        <div className="container mx-auto py-4 overflow-x-auto">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-colors ${
                  category.name === selectedCategory
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <category.Icon size={24} />
                <span className="text-xs font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Мероприятия</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                {...event}
                onDetailsClick={() => handleEventDetailsClick(event.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            Нет доступных мероприятий для выбранных критериев
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}

export default HomePage;