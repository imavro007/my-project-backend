
import { Notice, RoverUnit, GalleryItem } from '../types';
import { INITIAL_NOTICES, INITIAL_UNITS, INITIAL_GALLERY } from '../constants';

// প্রোডাকশনে আপনার Render বা অন্য সার্ভারের লিঙ্ক এখানে বসান
// উদাহরণ: "https://habiganj-rover-api.onrender.com/api"
const API_BASE = window.location.hostname === 'localhost' 
  ? "http://localhost:5000/api" 
  : "https://my-project-backend-hkk6.onrender.com/"; // এখানে Render থেকে পাওয়া লিঙ্কটি বসাবেন

const DB_KEY = 'habiganj_rover_local_db';

class DatabaseService {
  private isServerDown = false;

  private getLocalStore() {
    const data = localStorage.getItem(DB_KEY);
    if (!data) {
      const initial = { notices: INITIAL_NOTICES, units: INITIAL_UNITS, gallery: INITIAL_GALLERY };
      localStorage.setItem(DB_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  }

  private saveLocalStore(data: any) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  }

  private async request(endpoint: string, method: string = 'GET', body?: any) {
    const token = localStorage.getItem('admin_token');
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = token;

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) throw new Error("API Error");
      this.isServerDown = false;
      return await response.json();
    } catch (err) {
      console.warn("Backend server not reached, using local storage fallback.");
      this.isServerDown = true;
      return this.handleLocalRequest(endpoint, method, body);
    }
  }

  private handleLocalRequest(endpoint: string, method: string, body?: any) {
    const store = this.getLocalStore();
    
    if (endpoint === '/notices') {
      if (method === 'GET') return store.notices;
      if (method === 'POST') {
        const newNotice = { ...body, id: crypto.randomUUID() };
        store.notices.unshift(newNotice);
        this.saveLocalStore(store);
        return newNotice;
      }
    }

    if (endpoint.startsWith('/notices/')) {
      const id = endpoint.split('/').pop();
      if (method === 'PUT') {
        const idx = store.notices.findIndex((n: any) => n.id === id);
        if (idx !== -1) store.notices[idx] = { ...body, id };
      }
      if (method === 'DELETE') {
        store.notices = store.notices.filter((n: any) => n.id !== id);
      }
      this.saveLocalStore(store);
      return { success: true };
    }

    if (endpoint === '/units') {
      if (method === 'GET') return store.units;
      if (method === 'POST') {
        const newUnit = { ...body, id: crypto.randomUUID() };
        store.units.push(newUnit);
        this.saveLocalStore(store);
        return newUnit;
      }
    }

    if (endpoint.startsWith('/units/')) {
      const id = endpoint.split('/').pop();
      if (method === 'PUT') {
        const idx = store.units.findIndex((u: any) => u.id === id);
        if (idx !== -1) store.units[idx] = { ...body, id };
      }
      if (method === 'DELETE') {
        store.units = store.units.filter((u: any) => u.id !== id);
      }
      this.saveLocalStore(store);
      return { success: true };
    }

    if (endpoint === '/gallery') {
      if (method === 'GET') return store.gallery;
      if (method === 'POST') {
        const newItem = { ...body, id: crypto.randomUUID() };
        store.gallery.unshift(newItem);
        this.saveLocalStore(store);
        return newItem;
      }
    }

    if (endpoint.startsWith('/gallery/')) {
      const id = endpoint.split('/').pop();
      if (method === 'DELETE') {
        store.gallery = store.gallery.filter((g: any) => g.id !== id);
      }
      this.saveLocalStore(store);
      return { success: true };
    }

    return null;
  }

  async getNotices(): Promise<Notice[]> { return this.request('/notices'); }
  async addNotice(notice: Omit<Notice, 'id'>): Promise<Notice> { return this.request('/notices', 'POST', notice); }
  async updateNotice(id: string, updatedNotice: Omit<Notice, 'id'>): Promise<void> { await this.request(`/notices/${id}`, 'PUT', updatedNotice); }
  async deleteNotice(id: string): Promise<void> { await this.request(`/notices/${id}`, 'DELETE'); }

  async getUnits(): Promise<RoverUnit[]> { return this.request('/units'); }
  async addUnit(unit: Omit<RoverUnit, 'id'>): Promise<RoverUnit> { return this.request('/units', 'POST', unit); }
  async updateUnit(id: string, updatedUnit: Omit<RoverUnit, 'id'>): Promise<void> { await this.request(`/units/${id}`, 'PUT', updatedUnit); }
  async deleteUnit(id: string): Promise<void> { await this.request(`/units/${id}`, 'DELETE'); }

  async getGallery(): Promise<GalleryItem[]> { return this.request('/gallery'); }
  async addGalleryItem(item: Omit<GalleryItem, 'id'>): Promise<GalleryItem> { return this.request('/gallery', 'POST', item); }
  async updateGalleryItem(id: string, updatedItem: Omit<GalleryItem, 'id'>): Promise<void> { await this.request(`/gallery/${id}`, 'PUT', updatedItem); }
  async deleteGalleryItem(id: string): Promise<void> { await this.request(`/gallery/${id}`, 'DELETE'); }
}

export const db = new DatabaseService();
