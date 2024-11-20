import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>PRONET</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/feed">
        <mat-icon>home</mat-icon>
        Feed
      </button>
      <button mat-button routerLink="/perfil">
        <mat-icon>person</mat-icon>
        Perfil
      </button>
      <button mat-button routerLink="/usuarios">
        <mat-icon>people</mat-icon>
        Usuarios
      </button>
      <button mat-button (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        Cerrar Sesión
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();

  }
}