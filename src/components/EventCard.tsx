import React from 'react';
import { FiStar, FiClock, FiAward } from 'react-icons/fi';

interface EventCardProps {
  id: number;
  title: string;
  shortDescription: string;
  date: string;
  rating: number;
  imageUrl: string;
  price: number;
  isMeetBookingChoice: boolean;
  onDetailsClick?: (id: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  shortDescription,
  date,
  rating,
  imageUrl,
  price,
  isMeetBookingChoice,
  onDetailsClick
}) => {
  const handleDetailsClick = () => {
    if (onDetailsClick) {
      onDetailsClick(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="absolute top-2 left-2 right-2 flex items-center space-x-2">
          <span className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold">
            от {price} ₽
          </span>
          <span className="bg-white rounded-full px-3 py-1 flex items-center">
            <FiStar className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
          </span>
          <span className="bg-white rounded-full px-3 py-1 flex items-center">
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
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{shortDescription}</p>
        <button
          className="w-full bg-blue-500 text-white rounded-lg py-2 font-medium text-lg"
          onClick={handleDetailsClick}
        >
          Подробнее
        </button>
      </div>
    </div>
  );
}

export default EventCard;