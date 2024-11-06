import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

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


];