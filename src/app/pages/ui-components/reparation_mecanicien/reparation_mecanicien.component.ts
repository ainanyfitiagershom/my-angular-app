import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DiagnosticService } from 'src/app/services/diagnostic/diagnostic.service';
import { Router } from '@angular/router';
import { ReparationService } from 'src/app/services/reparation/reparation.service';
import { NiveauService } from 'src/app/services/niveau/niveau.service';
import { TypeReparationService } from 'src/app/services/typereparation/typereparation.service';

interface Option {
  value: string;
  viewValue: string;
}

export interface ReparationData {
  id: string;
  nom: string;
  niveau: string;
  etat: string;
}


@Component({
  selector: 'app-reparation-mecanicien',
  standalone: true,
  imports: [
    CommonModule,
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
    MatTableModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './reparation_mecanicien.component.html',
})

export class AppReparationMecanicienComponent  implements OnInit {
displayedColumns1: string[] = ['nom', 'niveau', 'etat', 'action'];
dataSource1: ReparationData[] = [];

  niveaux: any[] = [];
  types: any[] = [];

  Id: string  = '';
  idReparationVoiture: string | null = '';
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
      this.idReparationVoiture = this.route.snapshot.paramMap.get('id');
      this.chargerNiveaux();
      this.chargerTypeReparation()
      // Vérification si l'id est null, sinon on peut gérer l'erreur ou rediriger
      if (this.idReparationVoiture) {
        console.log("ID " + this.idReparationVoiture);
        this.chargerReparation(); // Appeler la fonction pour récupérer les données du diagnostic
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

    chargerReparation() {
      if (!this.idReparationVoiture) {
        console.error(" Aucun ID de réparation trouvé !");
        return;
      }
    
      this.reparationService.voirdetailReparation(this.idReparationVoiture).subscribe(
        (data) => {
          if (!data || !data.reparation || !data.reparation.details_reparation) {
            console.warn(" Aucun détail de réparation disponible !");
            this.dataSource1 = []; // Évite de laisser undefined
            return;
          }
    
          this.dataSource1 = data.reparation.details_reparation.map((detail: any) => ({
            id: detail.id_type_reparation?.id_type_reparation || "Inconnu",
            nom: detail.id_type_reparation?.nom || "Inconnu",
            niveau: detail.difficulte?.nom || "Inconnu",
            etat: detail.etat || "Inconnu",
          }));
        },
        (error) => {
          console.error(' Erreur lors de la récupération des réparations :', error);
        }
      );
    }
    
    allerAajoutPieces(event: Event) {
      event.preventDefault(); // Empêche le rechargement de la page

      console.log('Valeurs avant navigation :', {
        idReparationVoiture: this.idReparationVoiture,
        idTypeReparation: this.idTypeReparation,
        niveauDifficulte: this.niveauDifficulte
      });
    
      if (!this.idReparationVoiture || !this.idTypeReparation || !this.niveauDifficulte) {
        console.error('Sélectionnez un type de réparation et un niveau avant!');
        return;
      }
    
      this.router.navigate(['ui-components/ajout_pieces'], {
        queryParams: {
          idReparationVoiture: this.idReparationVoiture,
          idTypeReparation: this.idTypeReparation,
          niveauDifficulte: this.niveauDifficulte
        }
      });
    }
  
  
  country: Option[] = [
    { value: 'toyota', viewValue: 'Toyota' },
    { value: 'subaru', viewValue: 'Subaru' },
    { value: 'renault', viewValue: 'Renault' },
    { value: 'hyundai', viewValue: 'Hyundai' },
  ];

  selectedCountry = this.country[2].value;

  niveau: Option[] = [
    { value: 'niveau-1', viewValue: 'Niveau 1' },
    { value: 'niveau-2', viewValue: 'Niveau 2' },
    { value: 'niveau-3', viewValue: 'Niveau 3' },
    { value: 'niveau-4', viewValue: 'Niveau 4' },
  ];

  selectedValue = this.niveau[1].value;
  


}
