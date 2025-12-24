import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {

  private apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEventById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getMyEvents() {
    return this.http.get<any[]>(`${this.apiUrl}/my-events`);
  }
}
