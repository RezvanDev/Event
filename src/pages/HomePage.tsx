import React, { useState, useEffect } from 'react';
import { FiGrid, FiUsers, FiMusic, FiMic, FiImage, FiSearch, FiChevronDown } from 'react-icons/fi';
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

  useEffect(() => {
    fetchEvents();
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.MainButton.hide();
      window.Telegram.WebApp.BackButton.hide();
    }
  }, [selectedCategory, selectedCity]);

  const fetchEvents = async () => {
    try {
      console.log('Fetching events...');
      const category = selectedCategory === 'Все' ? undefined : selectedCategory;
      console.log('Category:', category, 'City:', selectedCity);
      const fetchedEvents = await api.getEvents(category, selectedCity);
      console.log('Fetched events:', fetchedEvents);
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEventDetailsClick = (id: number) => {
    navigate(`/event/${id}`);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pb-16">
      {/* Search and Categories */}
      <div className="bg-white dark:bg-gray-800 p-4 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск"
            className="w-full bg-gray-100 dark:bg-gray-700 rounded-md py-2 pl-10 pr-4 text-gray-800 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <div key={category.name} className="flex flex-col items-center">
              <button
                className={`w-[60px] h-[60px] rounded-full flex items-center justify-center ${
                  category.name === selectedCategory
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-300 dark:border-gray-600'
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <category.Icon size={24} />
              </button>
              <span className="text-xs mt-1 font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Мероприятия</h2>
          <div className="relative">
            <button 
              className="flex items-center text-blue-500 font-medium"
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
            >
              в {selectedCity}
              <FiChevronDown className="ml-1" />
            </button>
            {isCityDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-xl z-20">
                {cities.map((city) => (
                  <button
                    key={city}
                    className="block px-4 py-2 text-sm capitalize text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white w-full text-left"
                    onClick={() => {
                      setSelectedCity(city);
                      setIsCityDropdownOpen(false);
                    }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {filteredEvents.map(event => (
          <EventCard 
            key={event.id}
            id={event.id.toString()}
            title={event.title}
            description={event.description}
            date={event.date}
            rating={event.rating}
            imageUrl={event.imageUrl}
            isMeetBookingChoice={event.isMeetBookingChoice}
            category={event.category}
            city={event.city}
            onDetailsClick={handleEventDetailsClick}
          />
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
}

export default HomePage;