import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClient } from '@angular/common/http'; // ✅ ADD THIS

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, QRCodeModule],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {

  tickets: number = 1;
  bookingConfirmed = false;
  qrData = '';

  constructor(private http: HttpClient) {} // ✅ ADD THIS

  // ✅ STEP 3 CODE IS HERE
  confirmBooking() {
    console.log('🚀 Confirm clicked');

    this.http.post<any>('http://localhost:3000/bookings', {
      eventId: 1,
      tickets: this.tickets
    }).subscribe({
      next: (res) => {
        console.log('✅ Backend response', res);

        this.bookingConfirmed = true;

        this.qrData = JSON.stringify({
          bookingId: res.bookingId,
          tickets: this.tickets,
          app: 'Smart Event Planner'
        });
      },
      error: (err) => {
        console.error('❌ Booking failed', err);
      }
    });
  }
}
