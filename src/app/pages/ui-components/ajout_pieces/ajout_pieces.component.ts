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
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ReparationService } from 'src/app/services/reparation/reparation.service';
import { PieceService } from 'src/app/services/piece/piece.service';



export interface ProductsData {
  id: any;
  nom: any;
  nombre: number;
  progress: string;
}

// Données existantes
const ELEMENT_DATA: ProductsData[] = [];

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
  
  idReparationVoiture: string = "";
  idTypeReparation: string = "";
  niveauDifficulte: string = "";
  pieces: any[] = [];

  selectedPiece: any = null; // Stockera un objet { _id, nom }  // Stocke la pièce sélectionnée
  nombre: number = 0; // Stocke la quantité entrée
  

  displayedColumns: string[] = ['nom', 'nombre'];
  dataSource = [...ELEMENT_DATA]; // Copie des données

  constructor(
      private route: ActivatedRoute,
      private reparationService: ReparationService,
      private router: Router,
      private pieceService: PieceService,
    ) {
      
    }
    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.idReparationVoiture = params['idReparationVoiture'];
        this.idTypeReparation = params['idTypeReparation'];
        this.niveauDifficulte = params['niveauDifficulte'];
  
        console.log("ID Réparation Voiture :", this.idReparationVoiture);
        console.log("ID Type Réparation :", this.idTypeReparation);
        console.log("Niveau de Difficulté :", this.niveauDifficulte);
      });
      this.chargerPieces();
    }

    chargerPieces() {
      this.pieceService.obtenirPieces().subscribe({
        next: (data) => {
          if (data && Array.isArray(data)) {
            // Extraire uniquement le nom des catégories
            this.pieces = data;  // On prend le champ 'nom' de chaque catégorie
          } else {
            console.error("Données invalides pour les niveaux", data);
          }
        },
        error: (err) => console.error("Erreur lors du chargement des niveaux", err),
      });
    }
  
  // Ajouter une pièce à la liste
  ajouterPiece() {
    if (!this.selectedPiece || this.nombre <= 0) {
      console.error('Sélectionnez une pièce et entrez une quantité valide.');
      return;
    }

    // Correspondance avec l'interface ProductsData
    const nouvellePiece: ProductsData = {
      id: this.selectedPiece._id, 
      nom: this.selectedPiece.nom, 
      nombre: this.nombre, // 
      progress: this.nombre > 0 ? 'success' : 'warning'
    };
      


    this.dataSource = [...this.dataSource, nouvellePiece]; // Mettre à jour le tableau
    console.log('Pièce ajoutée :', nouvellePiece);

    // Réinitialiser le formulaire
    this.selectedPiece = '';
    this.nombre = 0;
  }

  // Méthode pour enregistrer les détails de la réparation
  enregistrerDetail() {
    if (!this.idTypeReparation || !this.niveauDifficulte) {
      console.error("Sélectionnez un type de réparation et un niveau !");
      return;
    }
    // Appeler le service pour envoyer les données
    this.reparationService.enregistrerDetailReparation(
      this.idReparationVoiture,
      this.idTypeReparation,
      this.niveauDifficulte,
      this.dataSource
    ).subscribe({
      next: (response) => {
        // Rediriger vers la page suivante si nécessaire
        this.router.navigate(['ui-components/reparations',this.idReparationVoiture]); // Exemple de redirection
      },
      error: (err) => {
        console.error("Erreur lors de l'enregistrement :", err);
      }
    });
  }

}
