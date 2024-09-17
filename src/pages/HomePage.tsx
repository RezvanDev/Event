import React, { useState, useEffect } from 'react';
import { FiGrid, FiUsers, FiMusic, FiMic, FiImage, FiSearch, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import BottomNavigation from '../components/BottomNavigation';
import { fetchEvents } from '../api/api';

const categories = [
  { name: 'Все', Icon: FiGrid },
  { name: 'Детям', Icon: FiUsers },
  { name: 'Концерты', Icon: FiMusic },
  { name: 'Стендап', Icon: FiMic },
  { name: 'Выставки', Icon: FiImage },
];

const cities = ['Москва', 'Ташкент', 'Самарканд', 'Алматы', 'Астана'];

interface Event {
  id: string;
  title: string;
  shortDescription: string;
  date: string;
  price: number;
  rating: number;
  imageUrl: string;
  category: string;
  city: string;
}

const HomePage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('Все');
    const [selectedCity, setSelectedCity] = useState(() => {
        const savedCity = localStorage.getItem('selectedCity');
        return savedCity || 'Москва';
    });
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const loadEvents = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchEvents(
                    selectedCategory !== 'Все' ? selectedCategory : undefined,
                    selectedCity
                );
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
                setError('Failed to load events. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, [selectedCategory, selectedCity]);

    const handleCityChange = (city: string) => {
        setSelectedCity(city);
        localStorage.setItem('selectedCity', city);
        setIsCityDropdownOpen(false);
    };

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
                                        onClick={() => handleCityChange(city)}
                                    >
                                        {city}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {loading ? (
                    <p>Загрузка мероприятий...</p>
                ) : error ? (
                    <div className="text-red-500 p-4 bg-red-100 rounded-md">
                        <p>{error}</p>
                        <button 
                            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => window.location.reload()}
                        >
                            Попробовать снова
                        </button>
                    </div>
                ) : (
                    events.map((event: Event) => (
                        <EventCard 
                            key={event.id} 
                            {...event} 
                            onDetailsClick={handleEventDetailsClick}
                        />
                    ))
                )}
            </div>

            <BottomNavigation />
        </div>
    );
}

export default HomePage;