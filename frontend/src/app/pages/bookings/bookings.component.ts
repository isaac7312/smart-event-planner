import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule, QRCodeModule],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {

  eventId!: number;
  tickets = 1;
  success = false;
  qrData = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
  }

  confirmBooking() {
    const bookingData = {
      attendee_id: 1,
      event_id: this.eventId,
      tickets_booked: this.tickets,
      total_price: this.tickets * 500
    };

    this.http.post('http://localhost:3000/bookings', bookingData)
      .subscribe(() => {
        this.success = true;
        this.qrData = `EVENT-${this.eventId}-TICKETS-${this.tickets}`;
      });
  }
}
