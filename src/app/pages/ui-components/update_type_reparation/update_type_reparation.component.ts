import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelService } from 'src/app/services/model/model.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { NiveauService } from 'src/app/services/niveau/niveau.service';
import { TypeReparationService } from 'src/app/services/typereparation/typereparation.service';
import { CategorieService } from 'src/app/services/categorie/categorie.service';


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
  templateUrl: './update_type_reparation.component.html',
  styleUrls: ['./update_type_reparation.component.css']
})
export class AppUpdateTypeReparationComponent implements OnInit {
  typeReparationId!: string;
  typeReparationNom!: string;
  typeReparationDescription!: string;
  typeReparationTempsEstime!: number;
  typeReparationPrixBase!: number;
  categories: any[] = [];  // Assure-toi de charger les catégories
  selectedCategory!: string;

  constructor(
    private route: ActivatedRoute,
    private typeReparationService: TypeReparationService,
    private router: Router,
    private categorieService: CategorieService,
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du type de réparation à modifier depuis l'URL
    this.typeReparationId = this.route.snapshot.paramMap.get('id')!;
  
    // Charger les catégories depuis l'API
    this.categorieService.getCategories().subscribe(
      (data) => {
        this.categories = data;  // Assurez-vous que les catégories sont chargées correctement
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  
    // Vérifie si l'ID existe, sinon arrête l'exécution
    if (!this.typeReparationId) {
      console.error("Erreur: ID du type de réparation introuvable !");
      return;
    }
  
    // Charger les données du type de réparation à mettre à jour
    this.typeReparationService.obtenirTypeReparationParId(this.typeReparationId).subscribe(typeReparation => {
      if (!typeReparation) {
        console.error("Erreur: Type de réparation non trouvé !");
        return;
      }
      this.typeReparationNom = typeReparation.nom || '';
      this.typeReparationDescription = typeReparation.description || '';
      this.typeReparationTempsEstime = typeReparation.temps_estime || 0;
      this.typeReparationPrixBase = typeReparation.prix_base || 0;
      
      // Initialiser la catégorie sélectionnée avec l'ID de la catégorie actuelle
      this.selectedCategory = typeReparation.categories._id || '';  // S'assurer de bien récupérer l'ID de la catégorie
    });
  }
  

  mettreAJourTypeReparation(): void {
    // Créer l'objet de mise à jour
    const updatedTypeReparation = {
      nom: this.typeReparationNom,
      description: this.typeReparationDescription,
      temps_estime: this.typeReparationTempsEstime,
      prix_base: this.typeReparationPrixBase,
      categories: this.selectedCategory
    };

    // Appel au service pour mettre à jour le type de réparation
    this.typeReparationService.mettreAJourTypeReparation(this.typeReparationId, updatedTypeReparation).subscribe(() => {
      alert('Type de réparation mis à jour avec succès');
      window.location.href = '/ui-components/type_reparation';
    }, error => {
      console.error('Erreur lors de la mise à jour du type de réparation :', error);
    });
  }
}
