import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  events: any[] = [];

  totalEvents = 0;
  totalBookings = 0;
  totalRevenue = 0;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getMyEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.calculateStats();
        this.loadCharts();
      },
      error: () => {
        console.error('Failed to load analytics data');
      }
    });
  }

  // 📊 Cards stats
  calculateStats() {
    this.totalEvents = this.events.length;

    this.totalBookings = this.events.reduce(
      (sum, e) => sum + Number(e.booked || 0), 0
    );

    this.totalRevenue = this.events.reduce(
      (sum, e) => sum + (Number(e.booked || 0) * Number(e.price || 0)), 0
    );
  }

  // 📈 Charts
  loadCharts() {
    const labels = this.events.map(e => e.name);
    const bookings = this.events.map(e => Number(e.booked || 0));
    const revenue = this.events.map(
      e => Number(e.booked || 0) * Number(e.price || 0)
    );
    const utilization = this.events.map(e =>
      e.capacity ? Math.round((e.booked / e.capacity) * 100) : 0
    );

    /* BOOKINGS PER EVENT */
    new Chart('bookingChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Tickets Booked',
          data: bookings,
          backgroundColor: '#3b82f6'
        }]
      },
      options: this.darkChartOptions()
    });

    /* REVENUE PER EVENT */
    new Chart('revenueChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Revenue (₹)',
          data: revenue,
          backgroundColor: '#10b981'
        }]
      },
      options: this.darkChartOptions()
    });

    /* CAPACITY UTILIZATION */
    new Chart('utilizationChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Capacity Utilization (%)',
          data: utilization,
          backgroundColor: '#f59e0b'
        }]
      },
      options: {
        ...this.darkChartOptions(),
        indexAxis: 'y'
      }
    });
  }

  // 🌙 Shared dark-mode options
  darkChartOptions() {
    return {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#e5e7eb'
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#e5e7eb' },
          grid: { color: '#1f2937' }
        },
        y: {
          ticks: { color: '#e5e7eb' },
          grid: { color: '#1f2937' }
        }
      }
    };
  }
}
