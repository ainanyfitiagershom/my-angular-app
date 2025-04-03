import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MarqueService } from 'src/app/services/marque/marque.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { NiveauService } from 'src/app/services/niveau/niveau.service';

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
    FormsModule,

  ],
  templateUrl: './niveau.component.html',
})
export class AppNiveauComponent {
  niveaux: any[] = [];

  displayedColumns: string[] = ['numero', 'nom', 'pourcentage', 'action'];  // Colonnes du tableau

  newNiveau = {
    nom: '',
    pourcentage: 0
  };

  constructor(private niveauService: NiveauService) {}

  ngOnInit(): void {
    this.getNiveaux();
  }

  // Récupérer tous les niveaux
  getNiveaux(): void {
    this.niveauService.obtenirNiveaux().subscribe(
      (data) => {
        console.log('Niveaux récupérés :', data);
        this.niveaux = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des niveaux', error);
      }
    );
  }

  // Ajouter un niveau
  addNiveau(): void {
    if (this.newNiveau.nom && this.newNiveau.pourcentage) {
      this.niveauService.ajouterNiveau(this.newNiveau).subscribe(
        (data) => {
          console.log('Niveau ajouté avec succès', data);
          this.getNiveaux();  // Actualiser la liste des niveaux
          this.newNiveau = { nom: '', pourcentage: 0 };  // Réinitialiser le formulaire
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du niveau', error);
        }
      );
    } else {
      alert('Veuillez remplir tous les champs');
    }
  }

  // Supprimer un niveau
  deleteNiveau(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce niveau ?')) {
      this.niveauService.supprimerNiveau(id).subscribe(
        (data) => {
          console.log('Niveau supprimé avec succès', data);
          this.getNiveaux();  // Actualiser la liste des niveaux après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression du niveau', error);
        }
      );
    }
  }
  
}
