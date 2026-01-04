import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventService {

  private apiUrl = `${environment.apiBaseUrl}/events`;

  constructor(private http: HttpClient) {}

  // 🔐 Attach JWT token
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // 🌍 Public - Get all events
  getEvents() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 🌍 Public - Get event by ID
  getEventById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 🔐 Organizer - Create event
  createEvent(data: any) {
    return this.http.post(this.apiUrl, data, this.getAuthHeaders());
  }

  // 🔐 Organizer - Get my events
  getMyEvents() {
    return this.http.get<any[]>(`${this.apiUrl}/my-events`, this.getAuthHeaders());
  }

  // 🔐 Organizer - Update event
  updateEvent(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data, this.getAuthHeaders());
  }

  // 🔐 Organizer - Delete event
  deleteEvent(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
}
