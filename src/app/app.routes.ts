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
    path: 'feed',
    loadComponent: () => import('./feed/feed.component').then(m => m.FeedComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'crear-publicacion',
    loadComponent: () => import('./crear-publicacion/crear-publicacion.component').then(m => m.CrearPublicacionComponent),
    canActivate: [AuthGuard]
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
    path: 'informacion-academica',
    loadComponent: () => import('./informacion-academica/informacion-academica.component').then(m => m.InformacionAcademicaComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'informacion-laboral',
    loadComponent: () => import('./informacion-laboral/informacion-laboral.component').then(m => m.InformacionLaboralComponent),
    canActivate: [AuthGuard]
  },  
  {
    path: '',
    redirectTo: '/feed',
    pathMatch: 'full'
  }
];