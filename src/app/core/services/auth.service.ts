import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { AuthResponse, DecodedToken, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  
  // Signal to hold the current authenticated user
  public currentUser = signal<DecodedToken | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  private checkToken() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('@TaskManager:token');
      if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          if (decoded.exp * 1000 < Date.now()) {
            this.logout();
          } else {
            this.currentUser.set(decoded);
          }
        } catch (e) {
          this.logout();
        }
      }
    }
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(res => this.handleAuthentication(res.token))
    );
  }

  register(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, credentials);
  }

  private handleAuthentication(token: string) {
    localStorage.setItem('@TaskManager:token', token);
    const decoded = jwtDecode<DecodedToken>(token);
    this.currentUser.set(decoded);
  }

  logout() {
    localStorage.removeItem('@TaskManager:token');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('@TaskManager:token');
    }
    return null;
  }
}
