import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

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
    private eventService: EventService,
    private router: Router
  ) {}

  createEvent() {
    console.log('🔥 CREATE EVENT CLICKED');
    console.log('EVENT DATA 👉', this.event);

    this.successMessage = '';
    this.errorMessage = '';

    // validations
    if (!this.event.name || !this.event.venue || !this.event.category) {
      this.errorMessage = 'Please fill all required fields';
      return;
    }

    if (!this.event.date_time) {
      this.errorMessage = 'Please select date and time';
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

    // MySQL safe datetime
    const payload = {
      ...this.event,
      date_time: this.event.date_time.replace('T', ' ')
    };

    this.eventService.createEvent(payload).subscribe({
      next: () => {
        alert('Event created successfully');
        this.router.navigate(['/events']);
      },
      error: (err) => {
        console.error('❌ Create Event Error:', err);
        this.errorMessage = err?.error?.message || 'Error creating event';
      }
    });
  }
}
