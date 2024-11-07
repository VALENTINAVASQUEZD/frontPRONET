import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.component').then(m => m.RegistroComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./lista-usuarios/lista-usuarios.component').then(m => m.ListaUsuariosComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.component').then(m => m.PerfilComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'editar-usuario/:id',
    loadComponent: () => import('./editar-perfil/editar-perfil.component').then(m => m.EditarUsuarioComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
