import React from 'react';
import { FiStar, FiClock, FiAward } from 'react-icons/fi';

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  rating: number;
  imageUrl: string;
  isMeetBookingChoice: boolean;
  category: string;
  city: string;
  onDetailsClick: (id: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  date,
  rating,
  imageUrl,
  isMeetBookingChoice,
  category,
  onDetailsClick
}) => {
  const handleDetailsClick = () => {
    if (onDetailsClick) {
      onDetailsClick(parseInt(id));
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4 ${getCategoryStyle(category)}`}>
      <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-start bg-gradient-to-b from-black/50 to-transparent">
          <span className="flex items-center text-white bg-black/30 rounded px-2 py-1">
            <FiStar className="w-4 h-4 mr-1" />
            <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
          </span>
          <span className="flex items-center text-white bg-black/30 rounded px-2 py-1">
            <FiClock className="w-4 h-4 mr-1" />
            <span className="text-sm">{date}</span>
          </span>
        </div>
        {isMeetBookingChoice && (
          <span className="absolute bottom-2 right-2 flex items-center bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full">
            <FiAward className="w-3 h-3 mr-1" />
            Выбор MeetBooking
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{description}</p>
        <button
          className="w-full bg-blue-500 text-white rounded-md py-2 font-medium hover:bg-blue-600 transition-colors duration-200"
          onClick={handleDetailsClick}
        >
          Подробнее
        </button>
      </div>
    </div>
  );
}

const getCategoryStyle = (category: string) => {
  switch (category.toLowerCase()) {
    case 'детям':
      return 'border-l-4 border-green-500';
    case 'концерты':
      return 'border-l-4 border-purple-500';
    case 'стендап':
      return 'border-l-4 border-yellow-500';
    case 'выставки':
      return 'border-l-4 border-red-500';
    default:
      return '';
  }
};

export default EventCard;