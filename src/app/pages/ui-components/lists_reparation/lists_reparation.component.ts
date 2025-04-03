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
  templateUrl: './lists_reparation.component.html',
})
export class AppListsReparationComponent {

  displayedColumns1: string[] = ['nom', 'niveau', 'etat', 'action'];
  dataSource1: ReparationData[] = [];

  iddiag: string | null = '';

  idReparationVoiture: string | null = '';
  idTypeReparation: string = ''; // Id de type de réparation à assigner

  statut : string = '';
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
            this.idReparationVoiture = data.reparation._id;
            this.statut = data.reparation.etat;
            this.dataSource1 = data.reparation.details_reparation.map((detail: any) => ({
              id: detail?._id || "Inconnu",
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

      

     


      voirDetailReparation(event: Event ,id: string ) {
          event.preventDefault(); // Empêche le rechargement de la page
          this.idTypeReparation = id;
            console.log('Valeurs avant navigation :', {
              idReparationVoiture: this.idReparationVoiture,
              idTypeReparation:  this.idTypeReparation
            });
          
            if (!this.idReparationVoiture || !this.idTypeReparation) {
              console.error('Sélectionnez un type de réparation  avant!');
              return;
            }
            this.router.navigate(['ui-components/detail_reparation_client'], {
              queryParams: {
                idReparationVoiture: this.idReparationVoiture,
                idTypeReparation: this.idTypeReparation,
              }
            });
      }


          

          
        
    validerReparation() {
        if (!this.idReparationVoiture) {
          console.error('Sélectionnez des valeurs valides .');
          return;
        }
        this.reparationService.validerReparation(this.idReparationVoiture).subscribe(
            (response) => {
              console.log('Réparation validée avec succès !', response);
              location.reload(); // Cela recharge la page entière
              // Rediriger ou effectuer des actions supplémentaires après l'assignation
              ///this.router.navigate(['ui-components/lists_reparation_manager',response.data.idDiagnostic]); // Exemple de redirection
            },
            (error) => {
              console.error('Erreur lors de l\'assignation de la réparation :', error);
            }
          );
      }


      validerClientReparation() {
        if (!this.idReparationVoiture) {
          console.error('Sélectionnez des valeurs valides .');
          return;
        }
        this.reparationService.validerEtFacturer(this.idReparationVoiture).subscribe(
            (response) => {
              console.log('Réparation validée avec succès ! et Facturee', response);
              //location.reload(); // Cela recharge la page entière
              // Rediriger ou effectuer des actions supplémentaires après l'assignation
              ///this.router.navigate(['ui-components/lists_reparation_manager',response.data.idDiagnostic]); // Exemple de redirection
            },
            (error) => {
              console.error('Erreur lors de l\'assignation de la réparation :', error);
            }
          );
      }


      
  }


