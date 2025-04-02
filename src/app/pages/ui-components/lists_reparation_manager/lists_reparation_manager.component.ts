import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { DiagnosticService } from 'src/app/services/diagnostic/diagnostic.service';
import { Router } from '@angular/router';
import { ReparationService } from 'src/app/services/reparation/reparation.service';



export interface ReparationData {
  id: string;
  nom: string;
  niveau: string;
  etat: string;
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
  templateUrl: './lists_reparation_manager.component.html',
})
export class AppListsReparationManagerComponent {

  displayedColumns1: string[] = ['nom', 'niveau', 'etat', 'action'];
  dataSource1: ReparationData[] = [];

  iddiag: string | null = '';

    constructor(
        private route: ActivatedRoute,
        private diagnosticService: DiagnosticService,
        private reparationService: ReparationService,
        private router: Router,
      ) {}
  
      ngOnInit(): void {
        this.iddiag = this.route.snapshot.paramMap.get('id');
        // Vérification si l'id est null, sinon on peut gérer l'erreur ou rediriger
        if (this.iddiag) {
          console.log("ID " + this.iddiag);
          this.chargerReparation(); // Appeler la fonction pour récupérer les données du diagnostic
        } else {
          console.error('ID du diagnostic introuvable dans l\'URL');
          // Tu peux aussi rediriger vers une autre page si tu veux
          this.router.navigate(['/404']); // Redirection vers une page d'erreur si l'ID est absent
        }
    
      }

      chargerReparation() {
        if (!this.iddiag) {
          console.error(" Aucun ID de réparation trouvé !");
          return;
        }
      
        this.reparationService.getReparationbydiag(this.iddiag).subscribe(
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

    }


