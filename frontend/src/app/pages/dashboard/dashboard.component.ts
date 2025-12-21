import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalEvents = 0;
  totalUsers = 0;
  totalBookings = 0;
  loading = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getCounts().subscribe({
      next: (data) => {
        this.totalEvents = data.totalEvents;
        this.totalUsers = data.totalUsers;
        this.totalBookings = data.totalBookings;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
