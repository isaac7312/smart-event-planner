import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('http://localhost:3000/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        // ✅ SAVE TOKEN HERE
        localStorage.setItem('auth_token', res.token);

        alert('Login successful');
        this.router.navigate(['/events']);
      },
      error: () => {
        alert('Login failed');
      }
    });
  }
}
