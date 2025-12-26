import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { EventsComponent } from './pages/events/events.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { LoginComponent } from './pages/login/login.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { OrganizerDashboardComponent } from './pages/organizer-dashboard/organizer-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },

  // Attendee routes
  { path: 'events', component: EventsComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  { path: 'bookings/:id', component: BookingsComponent },

  // Organizer routes
  { path: 'add-event', component: AddEventComponent },
  { path: 'dashboard', component: OrganizerDashboardComponent,  canActivate: [AuthGuard] },
  {
  path: 'add-event',
  component: AddEventComponent,
  canActivate: [AuthGuard]
  },
  // Auth
  { path: 'login', component: LoginComponent },

  {
  path: 'edit-event/:id',
  loadComponent: () =>
    import('./pages/edit-event/edit-event.component')
      .then(m => m.EditEventComponent)
  },

  {
  path: 'analytics',
  loadComponent: () =>
    import('./pages/analytics/analytics.component')
      .then(m => m.AnalyticsComponent)
  }


];