import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class EventService {

  private apiUrl = `${environment.apiBaseUrl}/events`;
  
  constructor(private http: HttpClient) {}

  // Get all events (Public)
  getEvents() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get event by ID
  getEventById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Get organizer events
  getMyEvents() {
    return this.http.get<any[]>(`${this.apiUrl}/my-events`);
  }

  // ✅ Delete event
  deleteEvent(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateEvent(id: number, data: any) {
  return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
