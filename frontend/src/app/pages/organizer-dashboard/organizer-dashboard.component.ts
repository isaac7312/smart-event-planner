import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-organizer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organizer-dashboard.component.html',
  styleUrls: ['./organizer-dashboard.component.css']
})
export class OrganizerDashboardComponent implements OnInit {

  events: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getMyEvents().subscribe({
      next: (data) => this.events = data,
      error: () => alert('Failed to load events')
    });
  }
}
