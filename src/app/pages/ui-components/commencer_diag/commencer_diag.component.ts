import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router'
import { PlanningService } from 'src/app/services/planning/planning.service';
// table 1
export interface planning {
  id: number;
  idReparationVoiture: string;
  idTypeReparation: string;
  mecanicien: string;
  type: string;
  nom: string;
  voiture: string;
  date_debut: string;
  date_fin: Date;
  statut: string;
}


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
  ],
  templateUrl: './commencer_diag.component.html',
})

export class AppCommencerDiagComponent {
  // table 1
  displayedColumns1: string[] = ['nom','voiture','date_debut','date_fin','action'];
  dataSource1 : planning[] = [];

  constructor(private planningService: PlanningService
    ) {}
  
    ngOnInit() {
      this.obtenirPlannings();
    }
  
    obtenirPlannings() {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user._id) {
        console.error("⚠️ Aucun utilisateur connecté !");
        return;
      }
      this.planningService.obtenirPlanningsReserveesMecanicien(user._id).subscribe(
        (data) => {
          this.dataSource1 = data.map((plan: any) => ({
            id:plan._id,
            idReparationVoiture: plan.id_reparation_voiture,
            idTypeReparation: plan.details.id_type_reparation,
            mecanicien: plan.mecanicien.nom,
            type: plan.type_tache,
            nom: plan.nom,
            voiture: plan?.voiture?.model?.name || "",
            date_debut: plan.date_heure_debut,
            date_fin: plan.date_heure_fin,
            statut:plan.statut,
          }));
        },
        (error) => {
          console.error('Erreur lors de la récupération des diagnostics :', error);
        }
      );
    }

 
    commencerReparation(element : any) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user._id) {
        console.error("⚠️ Aucun utilisateur connecté !");
        return;
      }
      const data = { 
          mecanicienId:user._id,
          idTypeReparation : element.idTypeReparation , 
          idReparationVoiture : element.idReparationVoiture,
      }
  
      console.log(data);
      this.planningService.commencerReparation(data).subscribe(
          (response) => {
            console.log('Reparation  commencée avec succès !', response);
            // Rediriger ou effectuer des actions supplémentaires après l'assignation
            location.reload();
          },
          (error) => {
            location.reload();
            console.error('Erreur lors de l\'assignation de la réparation :', error);
          }
        );
    }

    terminerReparation(element : any) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user._id) {
        console.error("⚠️ Aucun utilisateur connecté !");
        return;
      }
      const data = { 
          mecanicienId:user._id,
          idTypeReparation : element.idTypeReparation , 
          idReparationVoiture : element.idReparationVoiture,
      }
  
      console.log(data);
      this.planningService.terminerReparation(data).subscribe(
          (response) => {
            console.log('Reparation  commencée avec succès !', response);
            // Rediriger ou effectuer des actions supplémentaires après l'assignation
            location.reload();
          },
          (error) => {
            location.reload();
            console.error('Erreur lors de l\'assignation de la réparation :', error);
          }
        );
    }

}
