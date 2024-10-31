import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { EditarPerfilComponent } from '../editar-perfil/editar-perfil.component';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  username?: string;
  email?: string;
}

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule
  ],
  template: `
    <div class="container">
      <h1>Lista de usuarios</h1>
      
      <table mat-table [dataSource]="usuarios" class="mat-elevation-z8">
        <!-- ID Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>Id</th>
          <td mat-cell *matCellDef="let usuario">{{usuario.id}}</td>
        </ng-container>

        <!-- Nombre Column -->
        <ng-container matColumnDef="nombre">
          <th mat-header-cell *matHeaderCellDef>Nombre</th>
          <td mat-cell *matCellDef="let usuario">{{usuario.nombre}}</td>
        </ng-container>

        <!-- Apellido Column -->
        <ng-container matColumnDef="apellido">
          <th mat-header-cell *matHeaderCellDef>apellido</th>
          <td mat-cell *matCellDef="let usuario">{{usuario.apellido}}</td>
        </ng-container>

        <!-- Fecha Nacimiento Column -->
        <ng-container matColumnDef="fecha_nacimiento">
          <th mat-header-cell *matHeaderCellDef>fecha_nacimiento</th>
          <td mat-cell *matCellDef="let usuario">{{usuario.fecha_nacimiento}}</td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let usuario">
            <button mat-raised-button color="primary" (click)="editarUsuario(usuario)">
              Editar
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    table {
      width: 100%;
    }

    th.mat-header-cell,
    td.mat-cell {
      padding: 12px;
    }

    .mat-column-actions {
      width: 100px;
      text-align: center;
    }
  `]
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'fecha_nacimiento', 'actions'];

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.authService.listarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  editarUsuario(usuario: Usuario) {
    const dialogRef = this.dialog.open(EditarPerfilComponent, {
      width: '400px',
      data: usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarUsuarios();
      }
    });
  }
}