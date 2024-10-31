import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService, UserProfile } from '../auth.service';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  template: `
    <h2 mat-dialog-title>Editar Perfil</h2>
    <mat-dialog-content>
      <form [formGroup]="editarForm">
        <mat-form-field appearance="outline">
          <mat-label>Nombre</mat-label>
          <input matInput placeholder="Nombre" formControlName="nombre">
          <mat-error *ngIf="editarForm.get('nombre')?.hasError('required')">
            El nombre es requerido
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Apellido</mat-label>
          <input matInput placeholder="Apellido" formControlName="apellido">
          <mat-error *ngIf="editarForm.get('apellido')?.hasError('required')">
            El apellido es requerido
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Fecha de nacimiento</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="fecha_nacimiento">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="editarForm.get('fecha_nacimiento')?.hasError('required')">
            La fecha de nacimiento es requerida
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="!editarForm.valid">
        Guardar Cambios
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
      margin-bottom: 1em;
    }
    mat-dialog-content {
      min-width: 300px;
      padding-top: 1em;
    }
  `]
})
export class EditarPerfilComponent implements OnInit {
  editarForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditarPerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserProfile
  ) {
    this.editarForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.editarForm.patchValue({
        nombre: this.data.nombre,
        apellido: this.data.apellido,
        fecha_nacimiento: new Date(this.data.fecha_nacimiento)
      });
    }
  }

  onSubmit() {
    if (this.editarForm.valid) {
      const formData = {
        ...this.editarForm.value,
        fecha_nacimiento: this.formatDate(this.editarForm.value.fecha_nacimiento)
      };

      this.authService.editarPerfil(formData).subscribe({
        next: (response) => {
          console.log('Perfil actualizado', response);
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error al actualizar el perfil', error);
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}