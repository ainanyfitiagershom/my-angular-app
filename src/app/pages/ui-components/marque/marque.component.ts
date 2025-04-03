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
  templateUrl: './marque.component.html',
})
export class AppMarqueComponent {
  marque: string = '';
  marques: any[] = [];
  selectedMarque: any = null;
  updatedMarqueName: string = '';
  displayedColumns: string[] = ['numero','nom', 'action'];


  constructor(private marqueService: MarqueService, private router: Router) {}

  ngOnInit(): void {
    this.chargerMarques();
  }

  // Récupérer la liste des marques
  chargerMarques(): void {
    this.marqueService.getMarques().subscribe(
      (data) => {
        this.marques = data;
      },
      (error) => {
        console.error('❌ Erreur lors du chargement des marques :', error);
      }
    );
  }

  onSubmit() {
    console.log("🔹 Token utilisé :", localStorage.getItem('token'));

    if (!this.marque.trim()) {
      alert("Veuillez entrer une marque.");
      return;
    }

    this.marqueService.createMarque(this.marque).subscribe(
      response => {
        console.log("✅ Marque ajoutée :", response);
        alert("Marque ajoutée avec succès !");
        this.chargerMarques();
        this.marque = '';
      },
      (error: HttpErrorResponse) => {
        console.error("❌ Erreur lors de l'ajout de la marque :", error);
        alert("Erreur lors de l'ajout de la marque !");
      }
    );
  }

  supprimerMarque(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer cette marque ?')) {
      this.marqueService.deleteMarque(id).subscribe(
        () => {
          alert('✅ Marque supprimée avec succès !');
          this.chargerMarques(); // Recharger la liste après suppression
        },
        (error) => {
          console.error('❌ Erreur lors de la suppression :', error);
        }
      );
    }
  }

  resetForm() {
    this.marque = ''; 
  }

  openEditModal(marque: any) {
    this.selectedMarque = marque;
    this.updatedMarqueName = marque.name; // Pré-remplir le champ avec le nom actuel
  }
  
}
