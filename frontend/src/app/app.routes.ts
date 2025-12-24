import { Routes } from '@angular/router';
import { EventsComponent } from './pages/events/events.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { LoginComponent } from './pages/login/login.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { OrganizerDashboardComponent } from './pages/organizer-dashboard/organizer-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
  { path: 'bookings/:id', component: BookingsComponent },
  { path: 'add-event', component: AddEventComponent },
  { path: 'login', component: LoginComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  { path: 'organizer/dashboard', component: OrganizerDashboardComponent }
];
