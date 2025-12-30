import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiBaseUrl}/auth`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // 🔐 LOGIN
  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, {
      email,
      password
    });
  }

  // 💾 SAVE TOKEN
  saveLogin(token: string) {
    localStorage.setItem('token', token);
  }

  // ✅ AUTH CHECK
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // 🚪 LOGOUT
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
