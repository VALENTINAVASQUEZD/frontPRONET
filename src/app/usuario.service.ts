import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  getInformacionAcademica(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/listar/informacion-academica/${userId}/`, { headers: this.getHeaders() });
  }

  agregarInformacionAcademica(userId: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/listar/informacion-academica/${userId}/`, data, { headers: this.getHeaders() });
  }

  getInformacionLaboral(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/listar/informacion-laboral/${userId}/`, { headers: this.getHeaders() });
  }

  agregarInformacionLaboral(userId: string, nuevaInfo: any): Observable<any> {
    const url = `${this.apiUrl}/informacion-laboral/${userId}/`;
    return this.http.post<any>(url, nuevaInfo);
  }
}
