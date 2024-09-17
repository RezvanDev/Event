import axios from 'axios';

const API_BASE_URL = 'https://da39-202-79-184-241.ngrok-free.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const telegramUserId = localStorage.getItem('telegramUserId');
  if (telegramUserId) {
    config.headers['X-Telegram-User-Id'] = telegramUserId;
  }
  return config;
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