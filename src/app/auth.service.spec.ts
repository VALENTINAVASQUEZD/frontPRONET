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
});