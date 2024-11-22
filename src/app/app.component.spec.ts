import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';
import { EditarUsuarioComponent } from './editar-perfil/editar-perfil.component';
import { FeedComponent } from './feed/feed.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistroComponent } from './registro/registro.component';
import { InformacionAcademicaComponent } from './informacion-academica/informacion-academica.component';

import { AuthService } from './auth.service';
import { PublicacionService } from './publicacion.service';

describe('PRONET Components', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let publicacionService: jasmine.SpyObj<PublicacionService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['login', 'registro', 'getPerfil', 'isLoggedIn']);
    publicacionService = jasmine.createSpyObj('PublicacionService', ['getPublicaciones', 'crearPublicacion']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: PublicacionService, useValue: publicacionService }
      ]
    });
  });

  it('should create CrearPublicacionComponent', () => {
    const fixture = TestBed.createComponent(CrearPublicacionComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should create EditarUsuarioComponent', () => {
    const fixture = TestBed.createComponent(EditarUsuarioComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should create FeedComponent', () => {
    const fixture = TestBed.createComponent(FeedComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should create ListaUsuariosComponent', () => {
    const fixture = TestBed.createComponent(ListaUsuariosComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should create LoginComponent', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should create NavbarComponent', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should create PerfilComponent', () => {
    const fixture = TestBed.createComponent(PerfilComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should create RegistroComponent', () => {
    const fixture = TestBed.createComponent(RegistroComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
  
});