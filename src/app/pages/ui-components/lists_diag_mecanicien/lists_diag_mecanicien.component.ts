import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

// table 1
export interface productsData {
  id: number;
  voiture: string;
  mecanicien: string;
  observation: string;
  date_diag: Date;
  etat: string;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    voiture: 'Toyota',
    mecanicien: 'koto',
    observation: 'C est pas trop grave',
    date_diag: new Date('2025-03-30'),     
    etat: 'Terminé',
  },
  {
    id: 2,
    voiture: 'Renault',
    mecanicien: 'koto',
    observation: 'C est pas trop grave',
    date_diag: new Date('2025-03-30'),     
    etat: 'En cours',
  },
  {
    id: 3,
    voiture: 'Subaru',
    mecanicien: 'koto',
    observation: 'C est pas trop grave',
    date_diag: new Date('2025-03-30'), 
    etat: 'En cours',
  },
  {
    id: 4,
    voiture: 'Mazda',
    mecanicien: 'koto',
    observation: 'C est pas trop grave',
    date_diag: new Date('2025-03-30'), 
    etat: 'Terminé',
  },
];

@Component({
  selector: 'app-tables',
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './lists_diag_mecanicien.component.html',
})
export class AppListsDiagMecanicienComponent {
  // table 1
  displayedColumns1: string[] = ['assigned','mecanicien', 'observation', 'date_diag', 'etat','action'];
  dataSource1 = PRODUCT_DATA;
}
