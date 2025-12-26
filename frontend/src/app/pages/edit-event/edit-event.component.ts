import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-event.component.html'
})
export class EditEventComponent implements OnInit {

  eventId!: number;
  event: any = {};

  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));

    this.eventService.getEventById(this.eventId.toString()).subscribe({
      next: (data) => {
        this.event = data;
        this.event.date_time = data.date_time?.slice(0, 16);
      }
    });
  }

  updateEvent() {
    this.eventService.updateEvent(this.eventId, this.event).subscribe({
      next: () => {
        this.successMessage = 'Event updated successfully';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Update failed';
      }
    });
  }
}
