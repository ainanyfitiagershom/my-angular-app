import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ReparationService } from 'src/app/services/reparation/reparation.service';
import { PieceService } from 'src/app/services/piece/piece.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { RoleService } from 'src/app/services/role/role.service';


export interface Mecanicien {
  _id: string;
  nom: string;
  email: string;
  contact: string;
}

export interface PieceUtilisee {
  nom: string;
  quantite: number;
  prix_unitaire: number;
}

export interface Reparation {
  idTypeReparation: string;
  nomTypeReparation: string;
  difficulte: string ;
  prix: number;
  dureeEstimee: number;
  mecaniciens: Mecanicien[];
  piecesUtilisees: PieceUtilisee[];
}

export interface ProductsData {
  id: any;
  nom: any;
  date_debut: Date;
  date_fin: Date;
}

@Component({
  selector: 'app-detail-reparation-manager',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
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
    MatMenuModule, 
    CommonModule
  ],
  templateUrl: './detail_reparation_client.component.html',
})
export class AppDetailReparationClientComponent {

  idReparationVoiture: string = "";
  iddetaiReparation: string = "";
  idTypeReparation: string = "";
  pieces: any[] = [];
  mecaniciens: any[] = [];
  reparation!: Reparation;

  statut: string = "";

  selectedMecanicien: any = null; // Stockera un objet { _id, nom }  // Stocke la pièce sélectionnée
  dateDebut: Date = new Date; 
  dateFin: Date = new Date; 


  displayedColumnsMecaniciens: string[] = ['nom', 'email', 'contact'];
  displayedColumnsPieces: string[] = ['nom', 'quantite', 'prix_unitaire', 'total'];


    constructor(
        private route: ActivatedRoute,
        private reparationService: ReparationService,
        private router: Router,
        private roleService: RoleService,
      ) {
        
      }
      ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
          this.idReparationVoiture = params['idReparationVoiture'];
          this.iddetaiReparation = params['idTypeReparation'];
    
          console.log("ID Réparation Voiture :", this.idReparationVoiture);
          console.log("ID detail Réparation :", this.iddetaiReparation);
        });
        this.chargerDetailsReparation();
      }


  chargerDetailsReparation() {
    this.reparationService.voirDetailTypeReparation(this.idReparationVoiture, this.iddetaiReparation).subscribe(
      (data) => {
        this.idTypeReparation = data.idTypeReparation;
        this.statut = data.etat;
        this.reparation = {
          idTypeReparation : data.idTypeReparation,
          nomTypeReparation: data.nomTypeReparation,
          difficulte : data.difficulte.nom,
          prix: data.prix,
          dureeEstimee: data.dureeEstimee,
          mecaniciens: data.mecaniciens,
          piecesUtilisees: data.piecesUtilisees,
        };
      },
      (error) => {
        console.error('Erreur lors du chargement des détails de réparation', error);
      }
    );
  }



  formatDateToInput(date: Date): string {
    return date.toISOString().slice(0, 16); // Format YYYY-MM-DDTHH:mm
  }


  

  validerDetailClient() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user._id) {
      console.error("⚠️ Aucun utilisateur connecté !");
      return;
    }
    if (!this.idReparationVoiture || this.idTypeReparation === null ) {
      console.error('Sélectionner des valeurs valides .');
      return;
    }
    const action = "valider";
    this.reparationService.validerOuAnnulerDetail(user._id,this.idReparationVoiture, this.idTypeReparation,action).subscribe(
        (response) => {
          console.log('Réparation validée avec succès !', response);
          // Rediriger ou effectuer des actions supplémentaires après l'assignation
          location.reload();
        },
        (error) => {
          console.error('Erreur lors de l\'assignation de la réparation :', error);
        }
      );
  }

  annulerDetailClient() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user._id) {
      console.error("⚠️ Aucun utilisateur connecté !");
      return;
    }
    if (!this.idReparationVoiture || this.idTypeReparation === null ) {
      console.error('Sélectionner des valeurs valides .');
      return;
    }
    const action = "annuler";
    this.reparationService.validerOuAnnulerDetail(user._id,this.idReparationVoiture, this.idTypeReparation,action).subscribe(
        (response) => {
          console.log('Réparation validée avec succès !', response);
          location.reload(); // Exemple de redirection
        },
        (error) => {
          console.error('Erreur lors de l\'assignation de la réparation :', error);
        }
      );
  }

  
  

}
