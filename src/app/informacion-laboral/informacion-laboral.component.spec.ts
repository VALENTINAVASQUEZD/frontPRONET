import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformacionLaboralComponent } from './informacion-laboral.component';
import { UsuarioService } from '../usuario.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('InformacionLaboralComponent', () => {
  let component: InformacionLaboralComponent;
  let fixture: ComponentFixture<InformacionLaboralComponent>;
  let usuarioService: jasmine.SpyObj<UsuarioService>;

  beforeEach(() => {
    // Creamos un espía del servicio UsuarioService
    const spy = jasmine.createSpyObj('UsuarioService', ['getInformacionLaboral', 'agregarInformacionLaboral']);
    
    TestBed.configureTestingModule({
      declarations: [InformacionLaboralComponent],
      imports: [CommonModule, FormsModule], // Importamos los módulos necesarios para el formulario
      providers: [
        { provide: UsuarioService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InformacionLaboralComponent);
    component = fixture.componentInstance;
    
    // Configuramos el espía
    usuarioService = TestBed.inject(UsuarioService) as jasmine.SpyObj<UsuarioService>;

    // Simulamos la respuesta de getInformacionLaboral
    usuarioService.getInformacionLaboral.and.returnValue(of([
      { trabajo: 'Desarrollador', puesto: 'Frontend', departamento: 'TI', horas: 40 },
      { trabajo: 'Analista', puesto: 'Data', departamento: 'BI', horas: 35 }
    ]));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load informacion laboral on init', () => {
    component.ngOnInit(); // Llamamos al ngOnInit que obtiene la información
    fixture.detectChanges(); // Forzamos la detección de cambios

    // Verificamos que la información laboral se haya cargado
    expect(component.informacionLaboral.length).toBe(2);
    expect(component.informacionLaboral[0].trabajo).toBe('Desarrollador');
  });

  it('should call agregarInformacionLaboral and reset the form after adding new data', () => {
    // Simulamos que se agregó nueva información
    usuarioService.agregarInformacionLaboral.and.returnValue(of(null)); // Simulamos que la llamada a agregarInformacionLaboral es exitosa

    // Establecemos valores para el nuevo trabajo
    component.nuevoTrabajo = 'Tester';
    component.nuevoPuesto = 'QA';
    component.nuevoDepartamento = 'QA';
    component.nuevasHoras = 40;

    // Llamamos al método de agregar
    component.agregarInformacionLaboral();

    // Verificamos que se haya llamado al servicio y que el formulario se haya reiniciado
    expect(usuarioService.agregarInformacionLaboral).toHaveBeenCalledWith({
      trabajo: 'Tester',
      puesto: 'QA',
      departamento: 'QA',
      horas: 40
    });

    expect(component.nuevoTrabajo).toBe('');
    expect(component.nuevoPuesto).toBe('');
    expect(component.nuevoDepartamento).toBe('');
    expect(component.nuevasHoras).toBe(0);
  });
});

