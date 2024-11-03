// File: src/app/auth.service.ts

import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  mensaje?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registro(arg0: { username: string; email: string; password: string; nombre: string; apellido: string; fecha_nacimiento: Date; }) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8000/api';
  private userSubject: BehaviorSubject<UserProfile | null>;
  public user: Observable<UserProfile | null>;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.userSubject = new BehaviorSubject<UserProfile | null>(this.getUserFromStorage());
    this.user = this.userSubject.asObservable();
  }

  private getUserFromStorage(): UserProfile | null {
    if (!this.isBrowser) {
      return null;
    }
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  private getHeaders(): HttpHeaders {
    const user = this.getUserFromStorage();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user?.id || ''}`
    });
  }

  private saveUserToStorage(user: UserProfile): void {
    if (this.isBrowser) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
}