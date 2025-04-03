import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RendezVousService } from '../../../services/rendezvous/rendezvous.service';

// Interface pour la structure des données
export interface RdvData {
  id: string;
  voiture: string;
  client: string;
  probleme: string;
  date_debut: Date;
  commentaire: string;
}

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './lists_rdv_manager.component.html',
})
export class AppListsRdvManagerComponent implements OnInit {
  displayedColumns1: string[] = ['client','voiture', 'probleme', 'date_debut', 'commentaire', 'action'];
  dataSource1: RdvData[] = [];

  constructor(
      private rendezVousService: RendezVousService, 
      private router: Router
    ) {}

  ngOnInit() {
    this.obtenirListeRdv();
  }

  obtenirListeRdv() {
    this.rendezVousService.obtenirRendezVousEnAttente().subscribe(
      (data) => {
        this.dataSource1 = data.map((rdv: any) => ({
          id: rdv._id,
          client: rdv.client.nom, // Assure-toi que ce champ existe bien
          voiture: `${rdv.voiture.model.name} - ${rdv.voiture.energie.nom} (${rdv.voiture.transmission.nom})`, // Assure-toi que ce champ existe bien
          probleme: rdv.categorie.map((cat: any) => cat.nom).join(', '),
          date_debut: new Date(rdv.date_heure_rdv),
          commentaire: rdv.commentaire,
        }));
      },
      (error) => {
        console.error('Erreur lors de la récupération des RDV :', error);
      }
    );
  }

  redirigerVersConfirmation(id: string) {
    this.router.navigate(['/ui-components/confirmation_rdv_manager', id]);
  }

  confirmerRdv(rdvId: string) {
    this.rendezVousService.confirmerRendezVous(rdvId, { statut: 'confirmé' }).subscribe(
      response => {
        console.log("✅ Rendez-vous confirmé :", response);
        alert('Rendez-vous confirmé avec succès !');
        this.obtenirListeRdv(); // Actualiser la liste après confirmation
      },
      error => {
        console.error("❌ Erreur lors de la confirmation :", error);
      }
    );
  }
  
}
