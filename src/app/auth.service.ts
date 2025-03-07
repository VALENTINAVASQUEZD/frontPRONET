import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

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
  private apiUrl = 'http://localhost:8000/api/';
  private userSubject: BehaviorSubject<UserProfile | null>;
  public user: Observable<UserProfile | null>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<UserProfile | null>(this.getUserFromStorage());
    this.user = this.userSubject.asObservable();
  }

  private getUserFromStorage(): UserProfile | null {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  private saveUserToStorage(user: UserProfile): void {
    localStorage.setItem('user', JSON.stringify(user));
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

  getPerfil(): Observable<UserProfile> {
    const userId = this.getUserId();
    return this.http.get<UserProfile>(`${this.apiUrl}usuarios/perfil/${userId}/`).pipe(
      tap(profile => {
        this.saveUserToStorage(profile);
        this.userSubject.next(profile);
      }),
      catchError(error => {
        console.error('Error al obtener perfil:', error);
        throw error;
      })
    );
  }

  editarPerfil(datos: Partial<UserProfile>): Observable<UserProfile> {
    const userId = this.getUserId();
    return this.http.put<UserProfile>(`${this.apiUrl}usuarios/perfil/${userId}/`, datos).pipe(
      tap(updatedProfile => {
        const currentUser = this.getUserFromStorage();
        const mergedProfile = { ...currentUser, ...updatedProfile };
        this.saveUserToStorage(mergedProfile);
        this.userSubject.next(mergedProfile);
      }),
      catchError(error => {
        console.error('Error al editar perfil:', error);
        throw error;
      })
    );
  }

  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}usuarios/listar/`).pipe(
      catchError(error => {
        console.error('Error al listar usuarios:', error);
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    const user = this.getUserFromStorage();
    return !!user?.id;
  }

  getUserId(): number | null {
    const user = this.getUserFromStorage();
    return user?.id || null;
  }

  getUsuario(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}usuarios/perfil/${id}/`).pipe(
      catchError(error => {
        console.error('Error al obtener usuario:', error);
        throw error;
      })
    );
  }

  editarUsuario(id: number, datos: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}usuarios/perfil/${id}/`, datos).pipe(
      catchError(error => {
        console.error('Error al editar usuario:', error);
        throw error;
      })
    );
  }
}