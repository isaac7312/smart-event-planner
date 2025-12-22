import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // ✅ GET EVENT ID FROM URL
  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
  }

  // ✅ STEP 4 (BOOKING + REDIRECT)
  confirmBooking() {
    if (this.tickets < 1) {
      alert('Tickets must be at least 1');
      return;
    }

    this.http.post<any>('http://localhost:3000/bookings', {
      eventId: this.eventId,
      tickets: this.tickets
    }).subscribe({
      next: () => {
        this.bookingConfirmed = true;

        this.qrData = JSON.stringify({
          bookingId: Date.now(),
          eventId: this.eventId,
          tickets: this.tickets,
          app: 'Smart Event Planner'
        });

        // ✅ STEP 4 ADDITION (AUTO REFRESH EVENTS)
        setTimeout(() => {
          this.router.navigate(['/events']);
        }, 500);
      },
      error: (err) => {
        alert(err.error.message || 'Booking failed');
      }
    });
  }
}
