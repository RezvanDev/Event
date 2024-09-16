import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';

type NotificationType = 'Акции' | 'Статус бронирования' | 'Прочее';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  date: Date;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'Акции',
    title: 'Специальное предложение',
    description: 'Получите скидку 20% на все концерты в этом месяце!',
    date: new Date('2023-09-15')
  },
  {
    id: '2',
    type: 'Статус бронирования',
    title: 'Бронирование подтверждено',
    description: 'Ваше бронирование на концерт "Рок-фестиваль" подтверждено.',
    date: new Date('2023-09-10')
  },
  {
    id: '3',
    type: 'Прочее',
    title: 'Новое мероприятие',
    description: 'В нашем приложении появилось новое мероприятие "Джазовый вечер".',
    date: new Date('2023-09-10')
  },
];

const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NotificationType>('Акции');
  const navigate = useNavigate();

  const filteredNotifications = mockNotifications.filter(notification => 
    activeTab === 'Акции' ? true : notification.type === activeTab
  );

  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const date = notification.date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  const handleNotificationClick = (id: string) => {
    navigate(`/notifications/${id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-16">
      <h1 className="text-2xl font-bold p-4">Уведомления</h1>
      
      <div className="px-4 mb-4">
        <div className="flex space-x-2 rounded-lg bg-white p-1" style={{ border: '1px solid #007AFF' }}>
          {['Акции', 'Статус бронирования', 'Прочее'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out
                ${activeTab === tab 
                  ? 'bg-blue-500 text-white' 
                  : 'text-blue-500 hover:bg-blue-50'}`}
              onClick={() => setActiveTab(tab as NotificationType)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4">
        {Object.entries(groupedNotifications).map(([date, notifications]) => (
          <div key={date} className="mb-6">
            <h2 className="text-lg font-semibold mb-2">{date}</h2>
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className="bg-white rounded-lg p-4 mb-2 shadow-sm cursor-pointer"
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{notification.description}</p>
                  </div>
                  <FiChevronRight className="text-blue-500 ml-4" size={24} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Notifications;