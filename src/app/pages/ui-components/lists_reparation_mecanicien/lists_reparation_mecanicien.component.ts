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
  nom: string;
  etat: string;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    nom: 'Rep 1',   
    etat: 'Niveau 1',
  },
  {
    id: 2,
    nom: 'Rep 2',
    etat: 'Niveau 2',
  },
  {
    id: 3,
    nom: 'Rep 3',
    etat: 'Niveau 3',
  },
  {
    id: 4,
    nom: 'Rep 4',
    etat: 'Niveau 4',
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
  templateUrl: './lists_reparation_mecanicien.component.html',
})
export class AppListsReparationMecanicienComponent {
  // table 1
  displayedColumns1: string[] = ['assigned','etat','action'];
  dataSource1 = PRODUCT_DATA;
}
