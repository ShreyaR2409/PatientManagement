import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'https://localhost:7067/api/Agent';

  constructor(private http: HttpClient, private router: Router) {}

  public registerUser(user: any): Observable<string> {
    return this.http.post<any>(`${this.loginUrl}/CreateUser`, user, {
      responseType: 'text' as 'json',
    });
  }

  public loginUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/login`, user, { responseType: 'json' }).pipe(
      tap(response => {
        // Ensure response contains both token and user data
        const token = response?.token;
        const userData = response?.user;

        if (token) {
          this.setToken(token);  // Save token to localStorage
        }
        if (userData) {
          this.setUser(userData);  // Save user data to localStorage
        }
      })
    );
  }

  public resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.loginUrl}/reset-password`, data, {
      responseType: 'text' as 'json',
    });
  }

  public changePassword(data: any): Observable<any> {
    return this.http.post(`${this.loginUrl}/ChangePassword`, data, {
      responseType: 'text' as 'json',
    });
  }

  setUser(data: any) {
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
    } else {
      console.warn('Attempted to set undefined user data.');
    }
  }

 // Save the token to localStorage
 setToken(token: string) {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    console.warn('Attempted to set undefined token.');
  }
}

   // Get the token from localStorage
   getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return localStorage.getItem('user') !== null;
  }

  // Get user details
  getUserDetails() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Log out the user
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
