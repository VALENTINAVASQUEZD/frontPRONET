import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { PublicacionService } from '../publicacion.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-crear-publicacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css']
})
export class CrearPublicacionComponent {
  publicacionForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private publicacionService: PublicacionService,
    private router: Router,
    private authService: AuthService
  ) {
    this.publicacionForm = this.fb.group({
      contenido: ['', [Validators.required, Validators.maxLength(500)]],
      userId: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.publicacionForm.valid) {
      this.loading = true;
      const { userId, contenido } = this.publicacionForm.value;
      this.publicacionService.crearPublicacion(userId, { contenido }).subscribe({
        next: (response) => {
          console.log('Publicación creada:', response);
          this.loading = false;
          this.router.navigate(['/feed']);
        },
        error: (error) => {
          console.error('Error al crear la publicación:', error);
          this.loading = false;
          // Handle error (e.g., show error message to user)
        }
      });
    }
  }
}