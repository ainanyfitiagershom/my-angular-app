import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelService } from 'src/app/services/model/model.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-model',
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
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class AppModelComponent implements OnInit {
  models: any[] = []; // Liste des modèles
  marques: any[] = []; // Liste des marques
  typeVehicules: any[] = []; // Liste des types de véhicules
  modelName: string = '';
  selectedMarque: string = '';
  selectedTypeVehicule: string = '';
  displayedColumns: string[] = ['numero', 'nom','marque', 'vehicule', 'action'];  // Colonnes du tableau

  constructor(
    private modelService: ModelService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getModels();
    this.getMarques();
    this.getTypeVehicules();
  }

  // Récupérer tous les modèles
  getModels(): void {
    console.log("Tentative de récupération des modèles...");
  
    this.modelService.getModels().subscribe(
      (data) => {
        console.log("Modèles récupérés avec succès :", data); // Afficher les données reçues
        this.models = data;
      },
      (error) => {
        console.error("Erreur lors de la récupération des modèles", error);
      }
    );
  }
  

  // Récupérer toutes les marques
  getMarques(): void {
    this.modelService.getMarques().subscribe(
      (data) => {
        this.marques = data;
      },
      (error) => {
        console.error("Erreur lors de la récupération des marques", error);
      }
    );
  }

  // Récupérer tous les types de véhicules
  getTypeVehicules(): void {
    this.modelService.getTypeVehicules().subscribe(
      (data) => {
        this.typeVehicules = data;
      },
      (error) => {
        console.error("Erreur lors de la récupération des types de véhicules", error);
      }
    );
  }

  // Fonction pour ajouter un modèle
  addModel(): void {
    if (!this.modelName || !this.selectedMarque || !this.selectedTypeVehicule) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    this.modelService.createModel(this.modelName, this.selectedMarque, this.selectedTypeVehicule).subscribe(
      (response) => {
        alert("Modèle ajouté avec succès !");
        this.getModels(); // Recharger la liste des modèles
        this.modelName = ''; // Réinitialiser le champ du nom
        this.selectedMarque = ''; // Réinitialiser le sélecteur de marque
        this.selectedTypeVehicule = ''; // Réinitialiser le sélecteur de type de véhicule
      },
      (error) => {
        console.error("Erreur lors de l'ajout du modèle", error);
      }
    );
  }

  // Fonction pour supprimer un modèle
  deleteModel(id: string): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce modèle ?")) {
      this.modelService.deleteModel(id).subscribe(
        (response) => {
          alert("Modèle supprimé avec succès !");
          this.getModels(); // Recharger la liste des modèles
        },
        (error) => {
          console.error("Erreur lors de la suppression du modèle", error);
        }
      );
    }
  }


  goToUpdateModel(id: string): void {
    this.router.navigate([`/ui-components/update_model/${id}`]); 
  }
  
}
