import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-informacion-academica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './informacion-academica.component.html',
  styleUrls: ['./informacion-academica.component.css']
})
export class InformacionAcademicaComponent implements OnInit {
  informacionAcademica: any[] = [];
  nuevaInstitucion: string = '';
  nuevaCarrera: string = '';
  nuevaEspecializacion: string = '';
  error: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('user_id');
    if (userId) {
      console.log('user_id encontrado:', userId);
      this.obtenerInformacionAcademica(userId);
    } else {
      console.error('No se encontró el user_id en la ruta');
      this.error = 'No se encontró el ID del usuario en la ruta.';
    }
  }

  obtenerInformacionAcademica(userId: string) {
    this.usuarioService.getInformacionAcademica(userId).subscribe({
      next: (data) => {
        console.log('Datos obtenidos:', data);
        this.informacionAcademica = data;
      },
      error: (err) => {
        console.error('Error al obtener información académica', err);
        this.error = 'Error al obtener la información académica.';
      }
    });
  }

  agregarInformacionAcademica() {
    const userId = this.route.snapshot.paramMap.get('user_id');

    if (userId) {
      console.log('user_id obtenido para agregar información académica:', userId);

      const nuevaInfo = {
        institucion: this.nuevaInstitucion,
        carrera: this.nuevaCarrera,
        especializacion: this.nuevaEspecializacion
      };

      this.usuarioService.agregarInformacionAcademica(userId, nuevaInfo).subscribe({
        next: (data) => {
          console.log('Información académica agregada:', data);
          this.obtenerInformacionAcademica(userId);

          this.nuevaInstitucion = '';
          this.nuevaCarrera = '';
          this.nuevaEspecializacion = '';
        },
        error: (err) => {
          console.error('Error al agregar información académica:', err);
          this.error = 'Error al agregar la información académica.';
        }
      });
    } else {
      console.error('No se encontró el user_id para agregar la información académica');
      this.error = 'No se encontró el ID del usuario en la ruta.';
    }
  }
}
