import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelService } from 'src/app/services/model/model.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { PieceService } from 'src/app/services/piece/piece.service';
import { NiveauService } from 'src/app/services/niveau/niveau.service';


@Component({
  selector: 'app-model',
    imports: [
      MatTableModule,
      CommonModule,
      MatCardModule,
      MaterialModule,
      MatIconModule,
      MatMenuModule,
      MatButtonModule,
      FormsModule,
  
    ],
  templateUrl: './update_niveau.component.html',
  styleUrls: ['./update_niveau.component.css']
})
export class AppUpdateNiveauComponent implements OnInit {
  niveauId!: string;
  niveauNom!: string;
  niveauPourcentage!: number;

  constructor(
    private route: ActivatedRoute,
    private niveauService: NiveauService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du niveau à modifier depuis l'URL
    this.niveauId = this.route.snapshot.paramMap.get('id')!;

    // Vérifie si l'ID existe, sinon arrête l'exécution
    if (!this.niveauId) {
      console.error("Erreur: ID du niveau introuvable !");
      return;
    }

    // Charger les données du niveau à mettre à jour
    this.niveauService.obtenirNiveauParId(this.niveauId).subscribe(niveau => {
      if (!niveau) {
        console.error("Erreur: Niveau non trouvé !");
        return;
      }
      // Remplir le formulaire avec les données existantes
      this.niveauNom = niveau.nom || '';
      this.niveauPourcentage = niveau.pourcentage || 0;
    });
  }

  mettreAJourNiveau(): void {
    // Créer l'objet de mise à jour
    const updatedNiveau = {
      nom: this.niveauNom,
      pourcentage: this.niveauPourcentage
    };

    // Appel au service pour mettre à jour le niveau
    this.niveauService.mettreAJourNiveau(this.niveauId, updatedNiveau).subscribe(() => {
      alert('Niveau mis à jour avec succès');
      window.location.href = '/ui-components/niveau';
    }, error => {
      console.error('Erreur lors de la mise à jour du niveau :', error);
    });
  }
}
