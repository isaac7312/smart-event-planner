import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  eventId!: number;

  event = {
    name: '',
    description: '',
    venue: '',
    category: '',
    date_time: '',
    capacity: 1,
    price: 0
  };

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
        this.event = {
          ...data,
          // ✅ convert MySQL datetime → yyyy-MM-dd
          date_time: data.date_time?.split('T')[0] || ''
        };
      },
      error: () => {
        this.errorMessage = 'Failed to load event details';
      }
    });
  }

  updateEvent() {

    if (!this.event.name || !this.event.venue || !this.event.category) {
      this.errorMessage = 'Please fill all required fields';
      return;
    }

    if (this.event.capacity <= 0) {
      this.errorMessage = 'Capacity must be greater than zero';
      return;
    }

    if (this.event.price < 0) {
      this.errorMessage = 'Price cannot be negative';
      return;
    }

    // ✅ format date for backend
    const payload = {
      ...this.event,
      date_time: new Date(this.event.date_time)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    };

    this.eventService.updateEvent(this.eventId, payload).subscribe({
      next: () => {
        this.successMessage = 'Event updated successfully';
        this.errorMessage = '';

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Update failed';
        this.successMessage = '';
      }
    });
  }
}
