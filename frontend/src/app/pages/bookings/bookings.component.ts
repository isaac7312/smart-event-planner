import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, QRCodeModule],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  tickets: number = 1;
  bookingConfirmed = false;
  qrData = '';
  eventId!: number;

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
  }

  confirmBooking() {
    if (this.tickets < 1) {
      alert('Tickets must be at least 1');
      return;
    }

    this.bookingService.createBooking(this.eventId, this.tickets).subscribe({
      next: (res: any) => {
        this.bookingConfirmed = true;

        // ✅ QR CODE DATA
        this.qrData = JSON.stringify({
          bookingId: res.bookingId || Date.now(),
          eventId: this.eventId,
          tickets: this.tickets,
          app: 'Smart Event Planner'
        });
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Booking failed');
      }
    });
  }
}
