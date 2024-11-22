import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { AuthService, UserProfile } from '../auth.service';
import { EditarUsuarioComponent } from '../editar-perfil/editar-perfil.component';
import { UsuarioService } from '../usuario.service'; // Importa UsuarioService

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    RouterLink,
    MatTableModule
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfil: UserProfile | null = null;
  loading = false;
  error: string | null = null;
  tableData: { property: string; value: string }[] = [];
  informacionLaboral: { tituloTrabajo: string, datos: { property: string, value: string }[] }[] = [];

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService, // Inyecta UsuarioService
    private dialog: MatDialog,
    private router: Router // Inyecta Router para navegar a otras rutas
  ) {}

  ngOnInit() {
    this.loadPerfil();
    const userId = this.getUserId(); // Obtener el userId
    if (userId) {
      this.loadInformacionLaboral(userId); // Cargar información laboral
    }
  }

  // Cargar el perfil del usuario
  loadPerfil() {
    this.loading = true;
    this.error = null;
    this.authService.getPerfil().subscribe({
      next: (data) => {
        this.perfil = data;
        this.tableData = [
          { property: 'Nombre de usuario', value: data.username },
          { property: 'Email', value: data.email },
          { property: 'Nombre', value: data.nombre },
          { property: 'Apellido', value: data.apellido },
          { property: 'Fecha de Nacimiento', value: new Date(data.fecha_nacimiento).toLocaleDateString() }
        ];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el perfil:', err);
        this.error = 'Error al cargar el perfil. Por favor, intente nuevamente.';
        this.loading = false;
      }
    });
  }

  // Función para obtener el userId
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Cargar la información laboral del usuario
  loadInformacionLaboral(userId: string) {
    this.loading = true;
    this.usuarioService.getInformacionLaboral(userId).subscribe({
      next: (data) => {
        // Mapea la información laboral a la estructura deseada
        this.informacionLaboral = data.map((trabajo) => ({
          tituloTrabajo: trabajo.trabajo,
          datos: [
            { property: 'Puesto', value: trabajo.puesto },
            { property: 'Departamento', value: trabajo.departamento },
            { property: 'Horas trabajadas', value: trabajo.horas_trabajadas ? trabajo.horas_trabajadas.toString() : 'No disponible' }
          ]
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar información laboral:', err);
        this.error = 'Error al cargar información laboral. Por favor, intente nuevamente.';
        this.loading = false;
      }
    });
  }

  // Función para redirigir a la página de agregar información laboral
  agregarInformacionLaboral() {
    const userId = this.getUserId();
    if (userId) {
      this.router.navigate([`/informacion-laboral/${userId}`]); // Redirige a la ruta de agregar información laboral
    }
  }

  // Función para editar el perfil
  editarPerfil() {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '400px',
      data: this.perfil
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPerfil(); // Recargar el perfil después de editar
      }
    });
  }
}
