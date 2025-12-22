import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-event.component.html'
})
export class AddEventComponent {

  event = {
    organizer_id: 1, // assumed organizer
    name: '',
    description: '',
    venue: '',
    category: '',
    date_time: '',
    capacity: 1   // ✅ FIXED
  };

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  createEvent() {
    this.http.post('http://localhost:3000/events', this.event)
      .subscribe({
        next: () => {
          this.successMessage = 'Event created successfully';
          this.errorMessage = '';
        },
        error: () => {
          this.errorMessage = 'Error creating event';
          this.successMessage = '';
        }
      });
  }
}
