import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-organizer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organizer-dashboard.component.html'
})
export class OrganizerDashboardComponent implements OnInit {

  events: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('auth_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:3000/events/my-events', { headers })
      .subscribe({
        next: (data) => {
          this.events = data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          alert('Failed to load organizer events');
          this.loading = false;
        }
      });
  }
}
