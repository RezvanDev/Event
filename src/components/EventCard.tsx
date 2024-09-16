import React from 'react';
import { FiStar, FiClock } from 'react-icons/fi';

interface EventCardProps {
  id: string;
  title: string;
  shortDescription: string;
  date: string;
  price: number;
  rating: number;
  imageUrl: string;
  onDetailsClick?: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  shortDescription,
  date,
  price,
  rating,
  imageUrl,
  onDetailsClick
}) => {
  const handleDetailsClick = () => {
    if (onDetailsClick) {
      onDetailsClick(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-start">
          <div className="flex space-x-2">
            <span className="flex items-center bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold">
              ${price.toFixed(0)}
            </span>
            <span className="flex items-center bg-white text-yellow-500 rounded-full px-3 py-1 text-sm font-semibold">
              <FiStar className="w-4 h-4 mr-1" />
              {rating.toFixed(1)}
            </span>
          </div>
          <span className="flex items-center bg-white text-gray-700 rounded-full px-3 py-1 text-sm font-semibold">
            <FiClock className="w-4 h-4 mr-1" />
            {date}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{shortDescription}</p>
        <button
          className="w-full bg-blue-500 text-white rounded-md py-2 font-medium hover:bg-blue-600 transition duration-300"
          onClick={handleDetailsClick}
        >
          Подробнее
        </button>
      </div>
    </div>
  );
}

export default EventCard;