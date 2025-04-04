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
  date_recup: Date;
  etat: string;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    voiture: 'Toyota',
    date_depot: new Date('2025-03-30'),   
    date_debut: new Date('2025-03-30'),
    date_fin: new Date('2025-03-30'), 
    date_recup: new Date('2025-03-30'),
    etat: 'Terminer', 
  },
  {
    id: 2,
    voiture: 'Renault',
    date_depot: new Date('2025-03-30'), 
    date_debut: new Date('2025-03-30'),
    date_fin: new Date('2025-03-30'),  
    date_recup: new Date('2025-03-30'),
    etat: 'En cours',    
  },
  {
    id: 3,
    voiture: 'Subaru',
    date_depot: new Date('2025-03-30'), 
    date_debut: new Date('2025-03-30'),
    date_fin: new Date('2025-03-30'),  
    date_recup: new Date('2025-03-30'),
    etat: 'En attente',
  },
  {
    id: 4,
    voiture: 'Mazda',
    date_depot: new Date('2025-03-30'), 
    date_debut: new Date('2025-03-30'),
    date_fin: new Date('2025-03-30'), 
    date_recup: new Date('2025-03-30'),
    etat: 'Terminer', 
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
  templateUrl: './historique.component.html',
})
export class AppListPaimentComponent {
  // table 1
  displayedColumns1: string[] = ['assigned', 'date_depot', 'date_debut', 'date_fin', 'date_recup', 'action'];
  dataSource1 = PRODUCT_DATA;

}
