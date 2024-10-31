import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { AuthService, UserProfile } from '../auth.service';
import { EditarPerfilComponent } from '../editar-perfil/editar-perfil.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    RouterLink,
    MatTableModule
  ],
  template: `
    <div class="profile-container">
      <mat-card *ngIf="perfil" class="profile-card">
        <mat-card-title>Perfil de Usuario</mat-card-title>
        <mat-card-content>
          <table mat-table [dataSource]="tableData" class="mat-elevation-z8">
            <ng-container matColumnDef="property">
              <th mat-header-cell *matHeaderCellDef>Propiedad</th>
              <td mat-cell *matCellDef="let element">{{element.property}}</td>
            </ng-container>
            <ng-container matColumnDef="value">
              <th mat-header-cell *matHeaderCellDef>Valor</th>
              <td mat-cell *matCellDef="let element">{{element.value}}</td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="['property', 'value']"></tr>
            <tr mat-row *matRowDef="let row; columns: ['property', 'value'];"></tr>
          </table>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="editarPerfil()">
            Editar Perfil
          </button>
        </mat-card-actions>
      </mat-card>
      <mat-spinner *ngIf="loading"></mat-spinner>
      <p *ngIf="error">{{error}}</p>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 600px;
      margin: 2em auto;
      padding: 0 1em;
    }
    .profile-card {
      padding: 1em;
    }
    .mat-mdc-table {
      width: 100%;
      margin-bottom: 1em;
    }
  `]
})
export class PerfilComponent implements OnInit {
  perfil: UserProfile | null = null;
  loading = false;
  error: string | null = null;
  tableData: {property: string, value: string}[] = [];

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadPerfil();
  }

  loadPerfil() {
    this.loading = true;
    this.error = null;
    this.authService.getPerfil().subscribe({
      next: (data) => {
        this.perfil = data;
        this.tableData = [
          {property: 'Nombre de usuario', value: data.username},
          {property: 'Email', value: data.email},
          {property: 'Nombre', value: data.nombre},
          {property: 'Apellido', value: data.apellido},
          {property: 'Fecha de Nacimiento', value: new Date(data.fecha_nacimiento).toLocaleDateString()}
        ];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el perfil:', err);
        this.error = 'Error al cargar el perfil. Por favor, intente nuevamente.';
        this.loading = false;
      }
    });
  }

  editarPerfil() {
    const dialogRef = this.dialog.open(EditarPerfilComponent, {
      width: '400px',
      data: this.perfil
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPerfil();
      }
    });
  }
}