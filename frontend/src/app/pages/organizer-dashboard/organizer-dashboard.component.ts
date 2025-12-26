import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-organizer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './organizer-dashboard.component.html',
  styleUrls: ['./organizer-dashboard.component.css']
})
export class OrganizerDashboardComponent implements OnInit {

  events: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMyEvents();
  }

  // Load organizer events
  loadMyEvents() {
    this.loading = true;

    this.eventService.getMyEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load events';
        this.loading = false;
      }
    });
  }

  // ✅ REAL DELETE (BACKEND + UI)
deleteEvent(eventId: number) {
  if (!confirm('Are you sure you want to delete this event?')) return;

  this.eventService.deleteEvent(eventId).subscribe({
    next: () => {
      // Remove event from UI after backend success
      this.events = this.events.filter(e => e.id !== eventId);
    },
    error: () => {
      alert('Failed to delete event');
    }
  });
}

  // Logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
