import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'] // ✅ VERY IMPORTANT
})
export class AddEventComponent {

  event = {
    organizer_id: 1,
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

  constructor(private http: HttpClient) {}

  createEvent() {
    // reset messages
    this.successMessage = '';
    this.errorMessage = '';

    // 🔹 Validations
    if (!this.event.name || !this.event.venue || !this.event.category) {
      this.errorMessage = 'Please fill all required fields';
      return;
    }

    if (!this.event.date_time) {
      this.errorMessage = 'Please select a date';
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

    // 🔹 Convert date to MySQL DATETIME
    const payload = {
      ...this.event,
      date_time: new Date(this.event.date_time)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    };

    this.http.post('http://localhost:3000/events', payload).subscribe({
      next: () => {
        this.successMessage = 'Event created successfully';

        // reset form
        this.event = {
          organizer_id: 1,
          name: '',
          description: '',
          venue: '',
          category: '',
          date_time: '',
          capacity: 1,
          price: 0
        };
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err?.error?.message || 'Error creating event';
      }
    });
  }
}
