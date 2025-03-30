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
  date_depot: Date;
  date_debut: Date;
  date_fin: Date;
}

export interface pieceData {
  id: number;
  nom: string;
  quantite: number;
  prix_unitaire: number;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    voiture: 'Toyota',
    date_depot: new Date('2025-03-30'),   
    date_debut: new Date('2025-03-30'),
    date_fin: new Date('2025-03-30'),  
  },
  {
    id: 2,
    voiture: 'Renault',
    date_depot: new Date('2025-03-30'), 
    date_debut: new Date('2025-03-30'),
    date_fin: new Date('2025-03-30'),      
  },
  {
    id: 3,
    voiture: 'Subaru',
    date_depot: new Date('2025-03-30'), 
    date_debut: new Date('2025-03-30'),
    date_fin: new Date('2025-03-30'),  
  },
  {
    id: 4,
    voiture: 'Mazda',
    date_depot: new Date('2025-03-30'), 
    date_debut: new Date('2025-03-30'),
    date_fin: new Date('2025-03-30'),  
  },
];

const PIECE_DATA: pieceData[] = [
  {
    id: 1,
    nom: 'Frein',
    quantite: 2,
    prix_unitaire: 200.0,
  },
  {
    id: 2,
    nom: 'Moteur',
    quantite: 1,
    prix_unitaire: 500.0,
  },
  {
    id: 3,
    nom: 'Pneu',
    quantite: 4,
    prix_unitaire: 100.0,
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
  templateUrl: './lists_reparation.component.html',
})
export class AppListsReparationComponent {
  // table 1
  displayedColumns1: string[] = ['assigned', 'date_depot', 'date_debut', 'date_fin','action'];
  dataSource1 = PRODUCT_DATA;

  // table 2
  displayedColumns2: string[] = ['nom', 'quantite', 'prix_unitaire','total', 'action'];
  dataSource2 = PIECE_DATA;
}
