import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
<<<<<<< HEAD
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.component').then(m => m.RegistroComponent)
  },

  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
=======
>>>>>>> feature/editar

  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.component').then(m => m.PerfilComponent),
    canActivate: [AuthGuard]
  },
<<<<<<< HEAD

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
=======
  {
    path: 'editar-usuario/:id',
    loadComponent: () => import('./editar-perfil/editar-perfil.component').then(m => m.EditarUsuarioComponent),
    canActivate: [AuthGuard]
  },


];
>>>>>>> feature/editar
