import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { PieceService } from 'src/app/services/piece/piece.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategorieService } from 'src/app/services/categorie/categorie.service';
import { TypeReparationService } from 'src/app/services/typereparation/typereparation.service';

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
  templateUrl: './type_reparation.component.html',
})
export class AppTypeReparationComponent implements OnInit {
  typesReparation: any[] = [];
  categories: any[] = [];

  nouveauTypeReparation = {
    nom: '',
    description: '',
    categories: '',
    temps_estime: null,
    prix_base: null,
  };
  displayedColumns: string[] = ['numero', 'nom', 'description', 'category','temps_estime', 'prix_base','action'];

  constructor(private typeReparationService: TypeReparationService, private snackBar: MatSnackBar, private categorieService: CategorieService, private router: Router) {}

  ngOnInit(): void {
    this.obtenirTypesReparation();
    this.getCategories(); // Récupérer les catégories lors de l'initialisation
  }

  // Obtenir la liste des types de réparation
  obtenirTypesReparation(): void {
    this.typeReparationService.obtenirTypesReparation().subscribe(
      (data) => {
        this.typesReparation = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des types de réparation', error);
        this.snackBar.open('Erreur lors de la récupération des types de réparation', '', {
          duration: 2000,
        });
      }
    );
  }

  // Ajouter un type de réparation
  ajouterTypeReparation(): void {
    this.typeReparationService.ajouterTypeReparation(this.nouveauTypeReparation).subscribe(
      (data) => {
        this.snackBar.open('Type de réparation ajouté avec succès', '', {
          duration: 2000,
        });
        this.obtenirTypesReparation();  // Mettre à jour la liste
        this.nouveauTypeReparation = { nom: '', description: '', categories: '', temps_estime: null, prix_base: null };  // Réinitialiser le formulaire
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du type de réparation', error);
        this.snackBar.open('Erreur lors de l\'ajout du type de réparation', '', {
          duration: 2000,
        });
      }
    );
  }

  getCategories(): void {
    this.categorieService.getCategories().subscribe(
      (data) => {
        console.log('Réponse des catégories:', data);  // Vérifier la réponse dans la console
        this.categories = data; 
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  }

  deleteTypeReparation(id: string): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce modèle ?")) {
      this.typeReparationService.supprimerTypeReparation(id).subscribe(
        (response) => {
          alert("Modèle supprimé avec succès !");
          this.obtenirTypesReparation(); 
        },
        (error) => {
          console.error("Erreur lors de la suppression du modèle", error);
        }
      );
    }
  }

  goToUpdateTypeReparation(id: string): void {
    this.router.navigate([`/ui-components/update_type_reparation/${id}`]); 
  }
}
