import { Routes } from '@angular/router';
import { EventsComponent } from './pages/events/events.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddEventComponent } from './pages/add-event/add-event.component';

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
  { path: 'bookings/:id', component: BookingsComponent },
  { path: 'bookings/confirm/:id', component: BookingsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-event', component: AddEventComponent }
];

