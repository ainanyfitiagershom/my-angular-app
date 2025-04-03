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
import { NiveauService } from 'src/app/services/niveau/niveau.service';
import { ClientService } from 'src/app/services/client/client.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RendezVousService } from 'src/app/services/rendezvous/rendezvous.service';

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
  templateUrl: './lists_mecaniciens.component.html',
})
export class AppListsMecaniciensComponent {
  mecaniciens: any[] = [];
  displayedColumns: string[] = ['numero', 'nom', 'email', 'contact', 'adresse', 'salaire_mensuel'];  // Colonnes du tableau

  constructor(private snackBar: MatSnackBar, private mecanicien: RendezVousService) {}

  ngOnInit(): void {
    this.getMecaniciens();
  }

  // Récupérer les mécaniciens
  getMecaniciens(): void {
    this.mecanicien.getMecaniciens().subscribe(
      (data) => {
        console.log('Mécaniciens récupérés :', data);
        this.mecaniciens = data;  // Stocker les mécaniciens dans le tableau
      },
      (error) => {
        console.error('Erreur lors de la récupération des mécaniciens', error);
        this.snackBar.open('Erreur lors de la récupération des mécaniciens', '', {
          duration: 2000,
        });
      }
    );
  }

}
