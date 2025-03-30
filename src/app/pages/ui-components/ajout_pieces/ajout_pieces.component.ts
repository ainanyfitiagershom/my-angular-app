import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';

interface Food {
  value: string;
  viewValue: string;
}

export interface productsData {
  id: number;
  nom: string;
  nombre: number;
  prix_unitaire: string;
  etat: string;
  progress: string;
}


const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    nom: 'Frein',
    prix_unitaire: '3.5',
    nombre: 73,
    etat: 'Disponible',
    progress: 'success',
  },
  {
    id: 2,
    nom: 'Volant',
    prix_unitaire: '3.5',
    nombre: 73,
    etat: 'Non disponible',
    progress: 'warning',
  },
  {
    id: 3,
    nom: 'Vitesse',
    prix_unitaire: '3.5',
    nombre: 73,
    etat: 'Non disponible',
    progress: 'warning',
  },
  {
    id: 4,
    nom: 'Ampoule',
    prix_unitaire: '3.5',
    nombre: 73,
    etat: 'Non disponible',
    progress: 'warning',
  },
];

@Component({
  selector: 'app-forms',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MaterialModule, 
    MatMenuModule, 
    CommonModule
  ],
  templateUrl: './ajout_pieces.component.html',
})
export class AppAjoutPiecesComponent {

  country: Food[] = [
    { value: 'steak-0', viewValue: 'Toyota' },
    { value: 'pizza-1', viewValue: 'Subaru' },
    { value: 'tacos-2', viewValue: 'Renault' },
    { value: 'tacos-3', viewValue: 'Hundai' },
  ];

  selectedCountry = this.country[2].value;

  displayedColumns: string[] = ['assigned', 'nombre', 'etat', 'prix_unitaire'];
  dataSource = ELEMENT_DATA;
}
