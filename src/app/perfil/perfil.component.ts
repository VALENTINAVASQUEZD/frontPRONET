import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { AuthService, UserProfile } from '../auth.service';
import { EditarUsuarioComponent } from '../editar-perfil/editar-perfil.component';
import { MatTableModule } from '@angular/material/table';

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
  tableData: {property: string, value: string}[] = [];

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadPerfil();
  }

  loadPerfil() {
    this.loading = true;
    this.error = null;
    const userId = this.authService.getUserId();
    if (userId) {
      this.authService.getPerfil(userId).subscribe({
        next: (data) => {
          this.perfil = data;
          this.tableData = [
            {property: 'Nombre de usuario', value: data.username},
            {property: 'Email', value: data.email},
            {property: 'Nombre', value: data.nombre},
            {property: 'Apellido', value: data.apellido},
            {property: 'Fecha de Nacimiento', value: new Date(data.fecha_nacimiento).toLocaleDateString()}
          ];
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar el perfil:', err);
          this.error = 'Error al cargar el perfil. Por favor, intente nuevamente.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'No se pudo obtener el ID del usuario.';
      this.loading = false;
    }
  }

  editarPerfil() {
    if (this.perfil) {
      const dialogRef = this.dialog.open(EditarUsuarioComponent, {
        width: '400px',
        data: { userId: this.perfil.id }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadPerfil();
        }
      });
    }
  }
}