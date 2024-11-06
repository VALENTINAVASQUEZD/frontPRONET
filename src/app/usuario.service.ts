import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const userId = localStorage.getItem('userId');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-User-ID': userId || ''
    });
  }

  getPerfil(): Observable<any> {
    return this.http.get(`${this.apiUrl}/perfil/`, { headers: this.getHeaders() });
  }
  editarPerfil(datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/perfil/editar/`, datos, { headers: this.getHeaders() });
  }