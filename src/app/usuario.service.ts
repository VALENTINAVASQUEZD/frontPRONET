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

  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/listar/`, { headers: this.getHeaders() });
  }
  getInformacionAcademica(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/informacion-academica/`, { headers: this.getHeaders() });
  }

  agregarInformacionAcademica(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/informacion-academica/`, data, { headers: this.getHeaders() });
  }

  getInformacionLaboral(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/informacion-laboral/`, { headers: this.getHeaders() });
  }

  agregarInformacionLaboral(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/informacion-laboral/`, data, { headers: this.getHeaders() });
  }
}