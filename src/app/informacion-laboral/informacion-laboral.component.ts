import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-informacion-laboral',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './informacion-laboral.component.html',
  styleUrls: ['./informacion-laboral.component.css']
})
export class InformacionLaboralComponent implements OnInit {
  informacionLaboral: any[] = [];
  nuevoTrabajo: string = '';
  nuevoPuesto: string = '';
  nuevoDepartamento: string = '';
  nuevasHoras: number = 0;
  error: string = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    const userId = 'usuarioId';
    this.obtenerInformacionLaboral(userId);
  }

  obtenerInformacionLaboral(userId: string) {
    this.usuarioService.getInformacionLaboral(userId).subscribe({
      next: (data) => {
        console.log('Datos obtenidos:', data);
        this.informacionLaboral = data;
      },
      error: (err) => {
        console.error('Error al obtener información laboral', err);
        this.error = 'Error al obtener información laboral.';
      }
    });
  }

  agregarInformacionLaboral() {
    const userId = 'usuarioId';

    const nuevaInfo = {
      trabajo: this.nuevoTrabajo,
      puesto: this.nuevoPuesto,
      departamento: this.nuevoDepartamento,
      horas: this.nuevasHoras
    };

    this.usuarioService.agregarInformacionLaboral(userId, nuevaInfo).subscribe({
      next: (data) => {
        console.log('Información laboral agregada:', data);
        this.obtenerInformacionLaboral(userId);

        this.nuevoTrabajo = '';
        this.nuevoPuesto = '';
        this.nuevoDepartamento = '';
        this.nuevasHoras = 0;
      },
      error: (err) => {
        console.error('Error al agregar información laboral', err);
        this.error = 'Error al agregar la información laboral.';
      }
    });
  }
}
