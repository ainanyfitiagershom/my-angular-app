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
  templateUrl: './update_piece.component.html',
  styleUrls: ['./update_piece.component.css']
})
export class AppUpdatePieceComponent implements OnInit {
  pieceId!: string;
  pieceName!: string;
  pieceQuantity!: number;
  piecePrice!: number;

  constructor(
    private route: ActivatedRoute,
    private pieceService: PieceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la pièce à modifier depuis l'URL
    this.pieceId = this.route.snapshot.paramMap.get('id')!;

    // Vérifie si l'ID existe, sinon arrête l'exécution
    if (!this.pieceId) {
      console.error("Erreur: ID de la pièce introuvable !");
      return;
    }

    // Charger les données de la pièce à mettre à jour
    this.pieceService.obtenirPieceParId(this.pieceId).subscribe(piece => {
      if (!piece) {
        console.error("Erreur: Pièce non trouvée !");
        return;
      }
      // Remplir le formulaire avec les données existantes
      this.pieceName = piece.nom || '';
      this.pieceQuantity = piece.quantite || 0;
      this.piecePrice = piece.prix_unitaire || 0;
    });
  }

  mettreAJourPiece(): void {
    // Créer l'objet de mise à jour
    const updatedPiece = {
      nom: this.pieceName,
      quantite: this.pieceQuantity,
      prix_unitaire: this.piecePrice
    };

    // Appel au service pour mettre à jour la pièce
    this.pieceService.mettreAJourPiece(this.pieceId, updatedPiece).subscribe(() => {
      alert('Pièce mise à jour avec succès');
      window.location.href = '/ui-components/piece_mm';
    }, error => {
      console.error('Erreur lors de la mise à jour de la pièce :', error);
    });
  }
}
