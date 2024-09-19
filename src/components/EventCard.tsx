import React from 'react';
import { FiStar, FiClock } from 'react-icons/fi';

interface EventCardProps {
  id: number;
  title: string;
  shortDescription: string;
  date: string;
  rating: number;
  imageUrl: string;
  price: number;
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
        <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
          <span className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold">
            от {price} ₽
          </span>
          <div className="flex items-center space-x-2">
            <span className="bg-white rounded-full px-3 py-1 flex items-center">
              <FiStar className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
            </span>
            <span className="bg-white rounded-full px-3 py-1 flex items-center">
              <FiClock className="w-4 h-4 mr-1" />
              <span className="text-sm">{date}</span>
            </span>
          </div>
        </div>
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