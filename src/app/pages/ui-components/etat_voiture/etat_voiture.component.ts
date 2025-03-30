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
    date_debut: new Date('2025-03-30'),     
    priority: 'Commencer',
  },
  {
    id: 2,
    voiture: 'Renault',
    probleme: 'Frein',
    date_debut: new Date('2025-03-30'),     
    priority: 'Terminer',
  },
  {
    id: 3,
    voiture: 'Subaru',
    probleme: 'Frein',
    date_debut: new Date('2025-03-30'), 
    priority: 'Terminer',
  },
  {
    id: 4,
    voiture: 'Mazda',
    probleme: 'Frein',
    date_debut: new Date('2025-03-30'), 
    priority: 'Commencer',
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
  templateUrl: './etat_voiture.component.html',
})
export class AppEtatVoitureComponent {
  // table 1
  displayedColumns1: string[] = ['assigned', 'probleme', 'date_debut', 'priority'];
  dataSource1 = PRODUCT_DATA;
}
