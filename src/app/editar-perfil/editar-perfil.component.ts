import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, UserProfile } from '../auth.service';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  editarForm: FormGroup;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editarForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.authService.getUsuario(this.userId).subscribe({
        next: (usuario) => {
          this.editarForm.patchValue({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            fecha_nacimiento: new Date(usuario.fecha_nacimiento),
            email: usuario.email
          });
        },
        error: (error) => {
          console.error('Error al cargar usuario:', error);
        }
      });
    }
  }

  onSubmit() {
    if (this.editarForm.valid && this.userId) {
      const formData = {
        ...this.editarForm.value,
        fecha_nacimiento: this.formatDate(this.editarForm.value.fecha_nacimiento)
      };

      this.authService.editarUsuario(this.userId, formData).subscribe({
        next: (response) => {
          console.log('Usuario actualizado', response);
          this.router.navigate(['/usuarios']);
        },
        error: (error) => {
          console.error('Error al actualizar el usuario', error);
        }
      });
    }
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}