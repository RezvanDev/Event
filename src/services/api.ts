import axios from 'axios';

const API_URL = 'https://f6e1-95-214-210-188.ngrok-free.app'; // Adjust this to match your NestJS server URL

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
  }
};