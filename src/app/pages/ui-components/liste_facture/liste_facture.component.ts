import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FactureService } from 'src/app/services/facture/facture.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Facture {
  id: number;
  numero: string;
  date: string;
  montant: number;
}

@Component({
  selector: 'app-lists',
  standalone: true, // Si c'est un composant autonome
  imports: [
    CommonModule,  // ✅ Ajout obligatoire pour *ngFor
    MatListModule, 
    MatCardModule, 
    DatePipe, 
    MatIconModule, 
    MaterialModule,
    RouterModule,
  ],
  templateUrl: './liste_facture.component.html',
})
export class AppListeFactureComponent {
  factures: Facture[] = [];


  constructor(
      private factureService: FactureService,
    ) {}
  
    ngOnInit(): void {
      this.chargerFactures();
    }

    chargerFactures() {
      const client = JSON.parse(localStorage.getItem('user') || '{}');
      if (!client._id) {
        console.error("⚠️ Aucun client connecté !");
        return;
      }
      this.factureService.getFacturesByClient(client._id).subscribe({
        next: (data) => {
          // Vérification si 'data.voitures' existe et est un tableau
          if (data && Array.isArray(data.factures)) {
            // Mapping des voitures pour afficher le nom du modèle et la marque
            this.factures = data.factures.map((f: any) => ({
              id: f._id,
              numero: f.numero_facture,
              date: f.date_facture,
              montant: f.montant_total,  // Affichage du modèle, de l'énergie et de la transmission
            }));
          } else {
            console.error("Données invalides", data);
          }
        },
        error: (err) => console.error("Erreur lors du chargement des voitures", err),
      });
    }


}
