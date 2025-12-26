import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: any[] = [];
  loading = true;

  searchText: string = '';
  selectedCategory: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (data: any[]) => {

        // ✅ FIX: convert booked → number
        this.events = data.map(event => ({
          ...event,
          booked: Number(event.booked),
          price: Number(event.price ?? 0)
        }));

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  get filteredEvents() {
    return this.events.filter(event => {
      const matchesSearch =
        event.name.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesCategory =
        !this.selectedCategory || event.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  // ✅ helper for seats
  availableSeats(event: any): number {
    return event.capacity - event.booked;
  }
}