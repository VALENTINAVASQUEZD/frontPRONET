import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { PublicacionService } from '../publicacion.service';
import { AuthService } from '../auth.service';

interface Publicacion {
  id: number;
  usuario: {
    id: number;
    username: string;
    nombre: string;
    apellido: string;
  };
  contenido: string;
  fecha_creacion: string;
}

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private publicacionService: PublicacionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    this.loading = true;
    this.error = null;
    
    this.publicacionService.getPublicaciones().subscribe({
      next: (data) => {
        this.publicaciones = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar publicaciones:', err);
        this.error = 'Error al cargar las publicaciones. Por favor, intente nuevamente.';
        this.loading = false;
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}