import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RendezVousService } from '../../../services/rendezvous/rendezvous.service';
import { DiagnosticService } from '../../../services/diagnostic/diagnostic.service';
// Interface pour la structure des données
export interface RdvData {
  id: string;
  voiture: string;
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
  templateUrl: './tables.component.html',
})
export class AppTablesComponent implements OnInit {
  displayedColumns1: string[] = ['voiture', 'probleme', 'date_debut', 'commentaire', 'action'];
  dataSource1: RdvData[] = [];

  constructor(
      private rendezVousService: RendezVousService,
      private diagnosticService: DiagnosticService 
      
    ) {}

  ngOnInit() {
    this.obtenirListeRdv();
  }

  obtenirListeRdv() {
    const client = JSON.parse(localStorage.getItem('user') || '{}');
    if (!client._id) {
      console.error("⚠️ Aucun client connecté !");
      return;
    }

    this.rendezVousService.obtenirRendezVousParClient(client._id).subscribe(
      (data) => {
        this.dataSource1 = data.map((rdv: any) => ({
          id: rdv._id,
          voiture: `${rdv.voiture.model.name} - ${rdv.voiture.energie.nom} (${rdv.voiture.transmission.nom})`, // Assure-toi que ce champ existe bien
          probleme: rdv.categorie.map((cat: any) => cat.nom).join(', '),
          date_debut: new Date(rdv.date_heure_rdv),
          statut: rdv.statut, // Assure-toi que ce champ existe bien
          commentaire: rdv.commentaire,
        }));
      },
      (error) => {
        console.error('Erreur lors de la récupération des RDV :', error);
      }
    );
  }

  // Valider un rendez-vous
  validerRdv(id: string) {
    const data = { action: 'valider' };
    this.rendezVousService.actionRendezVous(id , data).subscribe(() => {
      // Mettre à jour la liste après validation
      this.obtenirListeRdv();
    });
  }
 
   // Valider un rendez-vous
   annulerRdv(id: string) {
    const data = { action: 'annuler' };
    this.rendezVousService.actionRendezVous(id , data).subscribe(() => {
      // Mettre à jour la liste après validation
      this.obtenirListeRdv();
    });
  }

  // Valider un rendez-vous
  deposerVoiture(id: string) {
    this.diagnosticService.deposerVoiture(id).subscribe(() => {
      // Mettre à jour la liste après validation
      this.obtenirListeRdv();
    });
  }

  
}
