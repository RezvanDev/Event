import axios from 'axios';

const API_BASE_URL = 'https://2033-202-79-184-241.ngrok-free.app'; // Замените на URL вашего бэкенда

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const fetchEvents = async (category?: string, city?: string) => {
  const params: any = {};
  if (category && category !== 'Все') {
    params.category = category;
  }
  if (city) {
    params.city = city;
  }
  
  const response = await api.get('/events', { 
    params,
    paramsSerializer: params => new URLSearchParams(params).toString()
  });
  return response.data;
};

export const fetchEventDetails = async (id: string) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

export const fetchNotifications = async () => {
    const response = await api.get('/notifications');
    return response.data;
  };
  
export const fetchNotificationDetails = async (id: string) => {
    const response = await api.get(`/notifications/${id}`);
    return response.data;
  };
  
export const markNotificationAsRead = async (id: number) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  };
  
export const deleteNotification = async (id: number) => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  };

export default api;