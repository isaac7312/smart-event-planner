import { Routes } from '@angular/router';
import { EventsComponent } from './pages/events/events.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
  { path: 'bookings/:id', component: BookingsComponent }, // ✅ VERY IMPORTANT
  { path: 'dashboard', component: DashboardComponent }
];
