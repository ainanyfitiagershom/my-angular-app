import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiagnosticService } from 'src/app/services/diagnostic/diagnostic.service';
import { Router } from '@angular/router';
import { ReparationService } from 'src/app/services/reparation/reparation.service';
import { NiveauService } from 'src/app/services/niveau/niveau.service';
import { TypeReparationService } from 'src/app/services/typereparation/typereparation.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms',
  imports: [
    FormsModule, // Ajoute ceci
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './faire-diagnostic.component.html',
})
export class PageDiagnosticComponent {

  niveaux: any[] = [];
  types: any[] = [];

  Id: string  = '';
  diagnosticId: string | null = '';
  diagnosticData: any = {}; // Utilise cette variable pour stocker les données du diagnostic
  idTypeReparation: string = ''; // Id de type de réparation à assigner
  niveauDifficulte: string = ''; // Niveau de difficulté de la réparation

  constructor(
    private route: ActivatedRoute,
    private diagnosticService: DiagnosticService,
    private reparationService: ReparationService,
    private router: Router,
    private niveauService: NiveauService,
    private typeReparationService: TypeReparationService ,
  ) {}

  ngOnInit(): void {
    this.diagnosticId = this.route.snapshot.paramMap.get('id');
    this.chargerNiveaux();
    this.chargerTypeReparation()
    // Vérification si l'id est null, sinon on peut gérer l'erreur ou rediriger
    if (this.diagnosticId) {
      console.log("ID " + this.diagnosticId); // Appeler la fonction pour récupérer les données du diagnostic
    } else {
      console.error('ID du diagnostic introuvable dans l\'URL');
      // Tu peux aussi rediriger vers une autre page si tu veux
      this.router.navigate(['/404']); // Redirection vers une page d'erreur si l'ID est absent
    }

  }
  

  chargerNiveaux() {
    this.niveauService.obtenirNiveaux().subscribe({
      next: (data) => {
        if (data && Array.isArray(data)) {
          // Extraire uniquement le nom des catégories
          this.niveaux = data;  // On prend le champ 'nom' de chaque catégorie
        } else {
          console.error("Données invalides pour les niveaux", data);
        }
      },
      error: (err) => console.error("Erreur lors du chargement des niveaux", err),
    });
  }

  chargerTypeReparation() {
    this.typeReparationService.obtenirTypesReparation().subscribe({
      next: (data) => {
        if (data && Array.isArray(data)) {
          // Extraire uniquement le nom des catégories
          this.types = data;  // On prend le champ 'nom' de chaque catégorie
        } else {
          console.error("Données invalides pour les TypeReparation", data);
        }
      },
      error: (err) => console.error("Erreur lors du chargement des TypeReparation", err),
    });
  }



  onSubmit() {
    console.log(this.idTypeReparation);
    console.log(this.niveauDifficulte);
    const data = {
      idTypeReparation: this.idTypeReparation,
      niveauDifficulte: this.niveauDifficulte,
    };
    console.log(data);
    if (this.diagnosticId) {
      this.reparationService.creationreparation(this.diagnosticId, data).subscribe(
        (response) => {
          console.log('Réparation assignée avec succès !', response);

          // Rediriger ou effectuer des actions supplémentaires après l'assignation
          this.router.navigate(['ui-components/reparations',response.reparation._id]); // Exemple de redirection
        },
        (error) => {
          console.error('Erreur lors de l\'assignation de la réparation :', error);
        }
      );
    }
  }
}
