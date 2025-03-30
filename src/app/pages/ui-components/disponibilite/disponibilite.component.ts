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
  templateUrl: './disponibilite.component.html',
})
export class AppDisponibiliteComponent {

  mois: Food[] = [
    { value: '0', viewValue: 'Janvier' },
    { value: '1', viewValue: 'Fevrier' },
    { value: '2', viewValue: 'Mars' },
    { value: '3', viewValue: 'Avris' },
  ];

  selectedMonth = this.mois[0].value;

  jour: Food[] = [
    { value: '0', viewValue: '1' },
    { value: '1', viewValue: '2' },
    { value: '2', viewValue: '3' },
    { value: '3', viewValue: '4' },
  ];

  selectedDay = this.jour[0].value;

}
