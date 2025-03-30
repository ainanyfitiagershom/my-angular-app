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
  probleme: string;
  date_debut: Date;
  priority: string;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    voiture: 'Toyota',
    probleme: 'Frein',
    date_debut: new Date('2025-03-30'),     priority: 'Deposer voiture',
  },
  {
    id: 2,
    voiture: 'Renault',
    probleme: 'Frein',
    date_debut: new Date('2025-03-30'),     priority: 'En attente',
  },
  {
    id: 3,
    voiture: 'Subaru',
    probleme: 'Frein',
    date_debut: new Date('2025-03-30'), 
    priority: 'En attente',
  },
  {
    id: 4,
    voiture: 'Mazda',
    probleme: 'Frein',
    date_debut: new Date('2025-03-30'), 
    priority: 'Deposer voiture',
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
  templateUrl: './tables.component.html',
})
export class AppTablesComponent {
  // table 1
  displayedColumns1: string[] = ['assigned', 'probleme', 'date_debut', 'priority'];
  dataSource1 = PRODUCT_DATA;
}
