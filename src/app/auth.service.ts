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
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/';
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

  public getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  private saveUserToStorage(user: UserProfile): void {
    if (this.isBrowser) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  login(credentials: { username: string; password: string }): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${this.apiUrl}usuarios/login/`, credentials).pipe(
      tap((response: UserProfile) => {
        console.log('Login response:', response);
        this.saveUserToStorage(response);
        this.userSubject.next(response);
      }),
      catchError(error => {
        console.error('Error en login:', error);
        throw error;
      })
    );
  }

  registro(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}usuarios/registro/`, datos).pipe(
      catchError(error => {
        console.error('Error en registro:', error);
        throw error;
      })
    );
  }

  getPerfil(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}usuarios/perfil/${userId}/`, { headers: this.getHeaders() }).pipe(
      tap(profile => {
        if (this.getUserFromStorage()?.id === userId) {
          this.saveUserToStorage(profile);
          this.userSubject.next(profile);
        }
      }),
      catchError(error => {
        console.error('Error al obtener perfil:', error);
        throw error;
      })
    );
  }

  editarPerfil(userId: number, datos: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}interaccionPerfil/editar/${userId}/`, datos, { 
      headers: this.getHeaders()
    }).pipe(
      tap(updatedProfile => {
        if (this.getUserFromStorage()?.id === userId) {
          const mergedProfile = { ...this.getUserFromStorage(), ...updatedProfile };
          this.saveUserToStorage(mergedProfile);
          this.userSubject.next(mergedProfile);
        }
      }),
      catchError(error => {
        console.error('Error al editar perfil:', error);
        throw error;
      })
    );
  }

  listarUsuarios(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${this.apiUrl}usuarios/listar/`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error al listar usuarios:', error);
        throw error;
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('user');
    }
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.getUserFromStorage();
  }

  getUserId(): number | null {
    const user = this.getUserFromStorage();
    return user?.id || null;
  }

  getUsuario(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}usuarios/${id}/`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error al obtener usuario:', error);
        throw error;
      })
    );
  }

  editarUsuario(id: number, datos: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}interaccionPerfil/editar/${id}/`, datos, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error al editar usuario:', error);
        throw error;
      })
    );
  }
}