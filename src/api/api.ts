import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const userId = localStorage.getItem('telegramUserId');
  if (userId) {
    config.headers['X-Telegram-User-Id'] = userId;
  }
  return config;
});

export const fetchEvents = async (category?: string, city?: string) => {
  try {
    const params: any = {};
    if (category && category !== 'Все') {
      params.category = category;
    }
    if (city) {
      params.city = city;
    }
    const response = await api.get('/api/events', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const fetchEventDetails = async (id: string) => {
  try {
    const response = await api.get(`/api/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};

export const fetchNotifications = async () => {
  try {
    const response = await api.get('/api/notifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const fetchNotificationDetails = async (id: string) => {
  try {
    const response = await api.get(`/api/notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notification details:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (id: number) => {
  try {
    const response = await api.put(`/api/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

export const deleteNotification = async (id: number) => {
  try {
    const response = await api.delete(`/api/notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};

export default api;