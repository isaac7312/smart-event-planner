import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-details.component.html'
})
export class EventDetailsComponent implements OnInit {

  event: any;
  loading = true;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId) {
      this.eventService.getEventById(eventId).subscribe({
        next: (data) => {
          this.event = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }
}
