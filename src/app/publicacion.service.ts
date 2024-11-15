import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private apiUrl = 'http://localhost:8000/api/publicaciones/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getPublicaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.authService.getHeaders()
    });
  }

  crearPublicacion(userId: number, datos: { contenido: string }): Observable<any> {
    const publicacionData = { ...datos, user_id: userId };
    return this.http.post(this.apiUrl, publicacionData, {
      headers: this.authService.getHeaders()
    });
  }
}