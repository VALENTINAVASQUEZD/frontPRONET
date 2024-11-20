import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informacion-academica',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './informacion-academica.component.html',
  styleUrls: ['./informacion-academica.component.css']
})
export class InformacionAcademicaComponent implements OnInit {
  informacionAcademica: any[] = [];
  nuevaInstitucion: string = '';
  nuevaCarrera: string = '';
  nuevaEspecializacion: string = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerInformacionAcademica();
  }

  obtenerInformacionAcademica() {
    this.usuarioService.getInformacionAcademica().subscribe(data => {
      this.informacionAcademica = data;
    });
  }

  agregarInformacionAcademica() {
    const nuevaInfo = {
      institucion: this.nuevaInstitucion,
      carrera: this.nuevaCarrera,
      especializacion: this.nuevaEspecializacion
    };

    this.usuarioService.agregarInformacionAcademica(nuevaInfo).subscribe(() => {
      this.obtenerInformacionAcademica();
      this.nuevaInstitucion = '';
      this.nuevaCarrera = '';
      this.nuevaEspecializacion = '';
    });
  }
}
