import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@NgModule({
  imports: [HttpClientModule],
  providers: [AuthService]
})
class TestModule {}

platformBrowserDynamic().bootstrapModule(TestModule).then(ref => {
  const authService = ref.injector.get(AuthService);

  // Test registration
  authService.registro({
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    nombre: 'Test',
    apellido: 'User',
    fecha_nacimiento: new Date('1990-01-01')
  }).subscribe(
    response => console.log('Registration successful', response),
    error => console.error('Registration failed', error)
  );

  // Test login
  authService.login({
    username: 'testuser',
    password: 'password123'
  }).subscribe(
    response => {
      console.log('Login successful', response);
      
      // Test get profile
      authService.getPerfil().subscribe(
        profile => console.log('Profile retrieved', profile),
        error => console.error('Failed to get profile', error)
      );

      // Test edit profile
      authService.editarPerfil({
        nombre: 'Updated Name'
      }).subscribe(
        updatedProfile => console.log('Profile updated', updatedProfile),
        error => console.error('Failed to update profile', error)
      );

      // Test list users
      authService.listarUsuarios().subscribe(
        users => console.log('Users listed', users),
        error => console.error('Failed to list users', error)
      );

      // Test logout
      authService.logout();
      console.log('Logged out');
    },
    error => console.error('Login failed', error)
  );
});