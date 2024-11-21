import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informacion-laboral',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './informacion-laboral.component.html',
  styleUrls: ['./informacion-laboral.component.css']
})
export class InformacionLaboralComponent implements OnInit {
  informacionLaboral: any[] = [];
  nuevoTrabajo: string = '';
  nuevoPuesto: string = '';
  nuevoDepartamento: string = '';
  nuevasHoras: number = 0;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerInformacionLaboral();
  }

  obtenerInformacionLaboral() {
    this.usuarioService.getInformacionLaboral().subscribe(data => {
      this.informacionLaboral = data;
    });
  }

  agregarInformacionLaboral() {
    const nuevaInfo = {
      trabajo: this.nuevoTrabajo,
      puesto: this.nuevoPuesto,
      departamento: this.nuevoDepartamento,
      horas: this.nuevasHoras
    };

    this.usuarioService.agregarInformacionLaboral(nuevaInfo).subscribe(() => {
      this.obtenerInformacionLaboral();
      this.nuevoTrabajo = '';
      this.nuevoPuesto = '';
      this.nuevoDepartamento = '';
      this.nuevasHoras = 0;
    });
  }
}