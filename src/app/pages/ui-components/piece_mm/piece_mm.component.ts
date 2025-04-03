import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MarqueService } from 'src/app/services/marque/marque.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { PieceService } from 'src/app/services/piece/piece.service';

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
    FormsModule,

  ],
  templateUrl: './piece_mm.component.html',
})
export class AppPieceMmComponent {
  pieces: any[] = [];
  newPiece = {
    nom: '',
    quantite: 0,
    prix_unitaire: 0
  };
  displayedColumns: string[] = ['numero', 'nom', 'quantite', 'prix_unitaire', 'action'];  // Colonnes du tableau


  constructor(private pieceService: PieceService) {}

  ngOnInit(): void {
    this.getPieces();
  }

  getPieces(): void {
    this.pieceService.obtenirPieces().subscribe(
      (data) => {
        console.log('Pièces récupérées :', data);
        this.pieces = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des pièces', error);
      }
    );
  }


  addPiece(): void {
    if (this.newPiece.nom && this.newPiece.quantite && this.newPiece.prix_unitaire) {
      this.pieceService.ajouterPiece(this.newPiece).subscribe(
        (data) => {
          console.log('Pièce ajoutée avec succès', data);
          alert("Pièces ajoutée avec succès !");
          this.getPieces();  // Actualiser la liste des pièces
          this.newPiece = { nom: '', quantite: 0, prix_unitaire: 0 };  // Réinitialiser le formulaire
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la pièce', error);
        }
      );
    } else {
      alert('Veuillez remplir tous les champs');
    }
  }

  deletePiece(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette pièce ?')) {
      this.pieceService.supprimerPiece(id).subscribe(
        (data) => {
          console.log('Pièce supprimée avec succès', data);
          this.getPieces();  // Actualiser la liste des pièces après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de la pièce', error);
        }
      );
    }
  }
  
}
