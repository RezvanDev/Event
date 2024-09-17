import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Токен недействителен или отсутствует
      localStorage.removeItem('token');
      // Вызываем повторную инициализацию Telegram WebApp
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
      } else {
        // Если мы не в Telegram WebApp, показываем сообщение об ошибке
        alert('Сессия истекла. Пожалуйста, перезапустите приложение в Telegram.');
      }
    }
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const fetchEvents = async (category?: string, city?: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authorization token found');
    }
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

export const loginWithTelegram = async (initData: string) => {
  try {
    const response = await api.post('/auth/telegram-login', { initData });
    localStorage.setItem('token', response.data.access_token);
    return response.data;
  } catch (error) {
    console.error('Error logging in with Telegram:', error);
    throw error;
  }
};

export default api;