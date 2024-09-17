import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Event {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  date: string;
  price: number;
  rating: number;
  imageUrl: string;
  category: string;
  city: string;
  address: string;
  format: string;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  isRead: boolean;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const userId = localStorage.getItem('telegramUserId');
  if (userId && config.headers) {
    config.headers['X-Telegram-User-Id'] = userId;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('Response error:', error.response.data);
      console.error('Status code:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const fetchEvents = async (category?: string, city?: string): Promise<Event[]> => {
  try {
    const params: Record<string, string> = {};
    if (category && category !== 'Все') {
      params.category = category;
    }
    if (city) {
      params.city = city;
    }
    const response = await api.get<Event[]>('/api/events', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const fetchEventDetails = async (id: string): Promise<Event> => {
  try {
    const response = await api.get<Event>(`/api/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};

export const fetchNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await api.get<Notification[]>('/api/notifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const fetchNotificationDetails = async (id: string): Promise<Notification> => {
  try {
    const response = await api.get<Notification>(`/api/notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notification details:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (id: string): Promise<Notification> => {
  try {
    const response = await api.put<Notification>(`/api/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

export const deleteNotification = async (id: string): Promise<void> => {
  try {
    await api.delete(`/api/notifications/${id}`);
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};

export default api;