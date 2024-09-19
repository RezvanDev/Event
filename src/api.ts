import axios from 'axios';

const API_URL = 'https://ea8c-202-79-184-241.ngrok-free.app';

export interface Event {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  date: string;
  rating: number;
  imageUrl: string;
  isMeetBookingChoice: boolean;
  category: string;
  city: string;
  price: number;
  format: string;
  address?: string;
}

export const api = {
  async getEvents(category?: string, city?: string): Promise<Event[]> {
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (city) params.append('city', city);
      const response = await axios.get(`${API_URL}/api/events`, { params });
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  async getEvent(id: number): Promise<Event> {
    const response = await axios.get(`${API_URL}/api/events/${id}`);
    return response.data;
  },

  async createEvent(eventData: Omit<Event, 'id'>): Promise<Event> {
    const response = await axios.post(`${API_URL}/api/events`, eventData);
    return response.data;
  },

  async updateEvent(id: number, eventData: Partial<Event>): Promise<Event> {
    const response = await axios.put(`${API_URL}/api/events/${id}`, eventData);
    return response.data;
  },

  async deleteEvent(id: number): Promise<void> {
    await axios.delete(`${API_URL}/api/events/${id}`);
  }
};