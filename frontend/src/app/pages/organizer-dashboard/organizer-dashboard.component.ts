import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
    this.http.get<any[]>('http://localhost:3000/events/my-events')
      .subscribe({
        next: (data) => {
          this.events = data;
          this.loading = false;
        },
        error: () => {
          alert('Failed to load events');
          this.loading = false;
        }
      });
  }
}
