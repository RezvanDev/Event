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
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

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
  const response = await api.get(`/api/events/${id}`);
  return response.data;
};

export const fetchNotifications = async () => {
  const response = await api.get('/api/notifications');
  return response.data;
};

export const fetchNotificationDetails = async (id: string) => {
  const response = await api.get(`/api/notifications/${id}`);
  return response.data;
};

export const markNotificationAsRead = async (id: number) => {
  const response = await api.put(`/api/notifications/${id}/read`);
  return response.data;
};

export const deleteNotification = async (id: number) => {
  const response = await api.delete(`/api/notifications/${id}`);
  return response.data;
};

export default api;