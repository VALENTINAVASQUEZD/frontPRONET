import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <mat-card>
      <mat-card-title>Iniciar Sesión</mat-card-title>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <mat-form-field>
            <input matInput placeholder="Nombre de usuario" formControlName="username">
            <mat-error *ngIf="loginForm.get('username')?.hasError('required')">
              El nombre de usuario es requerido
            </mat-error>
          </mat-form-field>
          <mat-form-field>
            <input matInput type="password" placeholder="Contraseña" formControlName="password">
            <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
              La contraseña es requerida
            </mat-error>
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" [disabled]="!loginForm.valid">
            Iniciar Sesión
          </button>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button routerLink="/registro">¿No tienes cuenta? Regístrate</button>
      </mat-card-actions>
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
    mat-card-actions {
      justify-content: center;
      padding: 1em;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login response:', response);
          this.router.navigate(['/perfil']);
        },
        error: (error) => {
          console.error('Error en el login', error);
        }
      });
    }
  }
}