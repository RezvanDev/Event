import React, { useState } from 'react';
import { FiGrid, FiUsers, FiMusic, FiMic, FiImage, FiSearch, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import BottomNavigation from '../components/BottomNavigation';

const categories = [
  { name: 'Все', Icon: FiGrid },
  { name: 'Детям', Icon: FiUsers },
  { name: 'Концерты', Icon: FiMusic },
  { name: 'Стендап', Icon: FiMic },
  { name: 'Выставки', Icon: FiImage },
];

const cities = ['Москва', 'Ташкент', 'Самарканд', 'Алматы', 'Астана'];

const mockEvents = [
  {
    id: '1',
    title: 'Концерт рок-группы',
    description: 'Живое выступление популярной рок-группы',
    date: '17 декабря',
    rating: 4.8,
    imageUrl: 'https://optim.tildacdn.one/tild3464-3730-4365-b237-663663333165/-/resize/744x/-/format/webp/Facebook_news_1290x7.jpg',
    isMeetBookingChoice: true,
    category: 'Концерты',
    city: 'Москва'
  },
  {
    id: '2',
    title: 'Детский спектакль',
    description: 'Интерактивный спектакль для детей',
    date: '18 декабря',
    rating: 4.5,
    imageUrl: 'https://cdn5.vedomosti.ru/image/2021/8e/t94ja/original-11wu.jpg',
    isMeetBookingChoice: false,
    category: 'Детям',
    city: 'Ташкент'
  },
  {
    id: '3',
    title: 'Стендап',
    description: 'Лучшие юмористы ташкента',
    date: '20 декабря',
    rating: 4.5,
    imageUrl: 'https://organizator.ru/wp-content/uploads/2024/01/korporativ-so-stendaperami.jpg',
    isMeetBookingChoice: false,
    category: 'Стендап',
    city: 'Ташкент'
  },
  
];

const HomePage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('Все');
    const [selectedCity, setSelectedCity] = useState('Москва');
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
    const navigate = useNavigate();
  
    const filteredEvents = mockEvents.filter(event => 
      (selectedCategory === 'Все' || event.category === selectedCategory) &&
      event.city === selectedCity
    );
  
    const handleEventDetailsClick = (id: string) => {
      navigate(`/event/${id}`);
    };
  
    return (
      <div className="bg-gray-100 min-h-screen pb-16">
        {/* Search and Categories */}
        <div className="bg-white p-4 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск"
              className="w-full bg-gray-100 rounded-md py-2 pl-10 pr-4"
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
                      : 'bg-white text-gray-600 border border-gray-300'
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <category.Icon size={24} />
                </button>
                <span className="text-xs mt-1 font-medium text-gray-700">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
  
        {/* Events List */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Мероприятия</h2>
            <div className="relative">
              <button 
                className="flex items-center text-blue-500 font-medium"
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              >
                в {selectedCity}
                <FiChevronDown className="ml-1" />
              </button>
              {isCityDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                  {cities.map((city) => (
                    <button
                      key={city}
                      className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white w-full text-left"
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
              {...event} 
              onDetailsClick={handleEventDetailsClick}
            />
          ))}
        </div>
  
        <BottomNavigation />
      </div>
    );
  }
  
  export default HomePage;