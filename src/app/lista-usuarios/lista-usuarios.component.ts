import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'fecha_nacimiento', 'actions'];

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
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
    this.router.navigate(['/editar-usuario', usuario.id]);
  }
}
