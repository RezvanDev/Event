import React from 'react';
import { FiStar, FiClock, FiAward, FiMapPin } from 'react-icons/fi';

interface EventCardProps {
  id: number;
  title: string;
  shortDescription: string;
  date: string;
  rating: number;
  imageUrl: string;
  isMeetBookingChoice: boolean;
  category: string;
  onDetailsClick?: (id: number) => void;
  city: string;
  price: number;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  shortDescription,
  date,
  rating,
  imageUrl,
  isMeetBookingChoice,
  category,
  onDetailsClick,
  city,
  price
}) => {
  const handleDetailsClick = () => {
    if (onDetailsClick) {
      onDetailsClick(id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-start">
          <span className="flex items-center text-white bg-black/50 rounded-full px-3 py-1 text-sm">
            <FiStar className="w-4 h-4 mr-1 text-yellow-400" />
            {rating.toFixed(1)}
          </span>
          {isMeetBookingChoice && (
            <span className="flex items-center bg-yellow-400 text-yellow-900 text-xs px-3 py-1 rounded-full font-semibold">
              <FiAward className="w-3 h-3 mr-1" />
              Выбор MeetBooking
            </span>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="font-bold text-lg text-white">{title}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-2">{shortDescription}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="flex items-center text-gray-500 text-sm">
            <FiClock className="w-4 h-4 mr-1" />
            {date}
          </span>
          <span className="flex items-center text-gray-500 text-sm">
            <FiMapPin className="w-4 h-4 mr-1" />
            {city}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold text-lg">{price} ₽</span>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
            onClick={handleDetailsClick}
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;