import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Замените на ваш URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const setTelegramUserId = (userId: string) => {
    localStorage.setItem('telegramUserId', userId);
  };

export const getEvents = (params: any) => api.get('/events', { params });
export const getEvent = (id: string) => api.get(`/events/${id}`);
export const getNotifications = () => api.get('/notifications');
export const getNotification = (id: string) => api.get(`/notifications/${id}`);
export const markNotificationAsRead = (id: string) => api.put(`/notifications/${id}/read`);

export default api;




