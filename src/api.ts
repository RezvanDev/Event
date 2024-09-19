import axios from 'axios';

const API_URL = 'https://ea8c-202-79-184-241.ngrok-free.app/api';

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
      const response = await axios.get(`${API_URL}/events`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  async getEvent(id: number): Promise<Event> {
    const response = await axios.get(`${API_URL}/events/${id}`);
    return response.data;
  }
};