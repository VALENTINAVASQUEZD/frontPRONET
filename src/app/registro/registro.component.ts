import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <mat-card>
      <mat-card-title>Registro</mat-card-title>
      <mat-card-content>
        <form [formGroup]="registroForm" (ngSubmit)="onSubmit()">
          <mat-form-field>
            <input matInput placeholder="Nombre de usuario" formControlName="username">
            <mat-error *ngIf="registroForm.get('username')?.hasError('required')">El nombre de usuario es requerido</mat-error>
          </mat-form-field>
          <mat-form-field>
            <input matInput placeholder="Email" formControlName="email" type="email">
            <mat-error *ngIf="registroForm.get('email')?.hasError('required')">El email es requerido</mat-error>
            <mat-error *ngIf="registroForm.get('email')?.hasError('email')">Ingrese un email válido</mat-error>
          </mat-form-field>
          <mat-form-field>
            <input matInput placeholder="Contraseña" formControlName="password" type="password">
            <mat-error *ngIf="registroForm.get('password')?.hasError('required')">La contraseña es requerida</mat-error>
          </mat-form-field>
          <mat-form-field>
            <input matInput placeholder="Nombre" formControlName="nombre">
            <mat-error *ngIf="registroForm.get('nombre')?.hasError('required')">El nombre es requerido</mat-error>
          </mat-form-field>
          <mat-form-field>
            <input matInput placeholder="Apellido" formControlName="apellido">
            <mat-error *ngIf="registroForm.get('apellido')?.hasError('required')">El apellido es requerido</mat-error>
          </mat-form-field>
          <mat-form-field>
            <input matInput [matDatepicker]="picker" placeholder="Fecha de nacimiento" formControlName="fecha_nacimiento">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error *ngIf="registroForm.get('fecha_nacimiento')?.hasError('required')">La fecha de nacimiento es requerida</mat-error>
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" [disabled]="!registroForm.valid">
            Registrarse
          </button>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      max-width: 400px;
      margin: 2em auto;
      text-align: center;
    }
    mat-form-field {
      display: block;
      margin-bottom: 1em;
    }
  `]
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const formData = {
        ...this.registroForm.value,
        fecha_nacimiento: this.formatDate(this.registroForm.value.fecha_nacimiento)
      };

      this.authService.registro(formData).subscribe({
        next: (response: any) => {
          console.log('Registro exitoso', response);
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          console.error('Error en el registro', error);
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