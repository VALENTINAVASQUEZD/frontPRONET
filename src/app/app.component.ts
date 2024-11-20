import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  template: `
    <app-navbar *ngIf="authService.isLoggedIn()"></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}