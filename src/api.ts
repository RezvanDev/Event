import axios from 'axios';

const API_URL = ' https://d57e-95-214-210-188.ngrok-free.app'; // Adjust this to match your NestJS server URL

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  rating: number;
  imageUrl: string;
  isMeetBookingChoice: boolean;
  category: string;
  city: string;
  price: number;
  address: string;
}

export const api = {
  async getEvents(category?: string, city?: string): Promise<Event[]> {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (city) params.append('city', city);
    const response = await axios.get(`${API_URL}/events`, { params });
    return response.data;
  },

  async getEvent(id: number): Promise<Event> {
    const response = await axios.get(`${API_URL}/events/${id}`);
    return response.data;
  },

  async createEvent(eventData: Omit<Event, 'id'>): Promise<Event> {
    const response = await axios.post(`${API_URL}/events`, eventData);
    return response.data;
  },

  async updateEvent(id: number, eventData: Partial<Event>): Promise<Event> {
    const response = await axios.put(`${API_URL}/events/${id}`, eventData);
    return response.data;
  },

  async deleteEvent(id: number): Promise<void> {
    await axios.delete(`${API_URL}/events/${id}`);
  },

  sendDataToTelegram(data: any) {
    if (window.Telegram && window.Telegram.WebApp) {
      const webAppData = window.Telegram.WebApp.initDataUnsafe;
      const chatId = webAppData.user.id;
      return axios.post(`${API_URL}/telegram/webhook`, { ...data, chatId });
    } else {
      console.error('Telegram WebApp is not available');
      return Promise.reject('Telegram WebApp is not available');
    }
  }
};