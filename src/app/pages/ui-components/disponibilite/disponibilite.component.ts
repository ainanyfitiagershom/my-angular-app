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
  mecanicien: string;
  type: string;
  client: string;
  voiture: string;
  date_debut: string;
  date_fin: Date;
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
  templateUrl: './disponibilite.component.html',
})

export class AppDisponibiliteComponent {
  // table 1
  displayedColumns1: string[] = ['mecanicien','type', 'client', 'voiture','date_debut','date_fin'];
  dataSource1 : planning[] = [];

  constructor(private planningService: PlanningService
    ) {}
  
    ngOnInit() {
      this.obtenirPlannings();
    }
  
    obtenirPlannings() {
      this.planningService.obtenirPlanningsReserves().subscribe(
        (data) => {
          this.dataSource1 = data.map((plan: any) => ({
            id:plan._id,
            mecanicien: plan.mecanicien.nom,
            type: plan.type_tache,
            client: plan?.details?.client?.nom || "",
            voiture: plan?.details?.voiture?.model?.name || "",
            date_debut: plan.date_heure_debut,
            date_fin: plan.date_heure_fin,
          }));
        },
        (error) => {
          console.error('Erreur lors de la récupération des diagnostics :', error);
        }
      );
    }

}
