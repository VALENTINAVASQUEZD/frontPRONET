import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    const userId = 'usuarioId'; // Asegúrate de asignar el ID real del usuario
    this.obtenerInformacionAcademica(userId);
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
    const userId = 'usuarioId'; // Asegúrate de tener el userId correcto aquí

    const nuevaInfo = {
      institucion: this.nuevaInstitucion,
      carrera: this.nuevaCarrera,
      especializacion: this.nuevaEspecializacion
    };

    this.usuarioService.agregarInformacionAcademica(userId, nuevaInfo).subscribe({
      next: (data) => {
        console.log('Información académica agregada:', data);
        // Luego de agregar la nueva información, obtenemos la lista actualizada
        this.obtenerInformacionAcademica(userId);

        // Limpiar los campos
        this.nuevaInstitucion = '';
        this.nuevaCarrera = '';
        this.nuevaEspecializacion = '';
      },
      error: (err) => {
        console.error('Error al agregar información académica', err);
        this.error = 'Error al agregar la información académica.';
      }
    });
  }
}
