import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { DiagnosticService } from '../../../services/diagnostic/diagnostic.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'

// Interface pour les données du tableau
export interface DiagnosticData {
  id: string;
  voiture: string;
  client: string;
  observation: string;
  date_diag: Date;
  etat: string;
}

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './lists_diag_manager.component.html',
})
export class AppListsDiagManagerComponent implements OnInit {
  displayedColumns1: string[] = ['voiture', 'client', 'observation', 'date_diag', 'etat', 'action'];
  dataSource1: DiagnosticData[] = [];

  constructor(private diagnosticService: DiagnosticService,
              private router: Router
  ) {}

  ngOnInit() {
    this.obtenirDiagnostics();
  }

  obtenirDiagnostics() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user._id) {
      console.error("⚠️ Aucun utilisateur connecté !");
      return;
    }

    this.diagnosticService.getDiagnosticsTermines().subscribe(
      (data) => {
        this.dataSource1 = data.diagnostics.map((diag: any) => ({
          id: diag._id,
          voiture: `${diag.voiture.model.name} - ${diag.voiture.energie.nom} (${diag.voiture.transmission.nom})`,
          client: diag.client.nom,
          observation: diag.observation || 'Aucune observation',
          date_diag: new Date(diag.date_diag),
          etat: diag.etat,
        }));
      },
      (error) => {
        console.error('Erreur lors de la récupération des diagnostics :', error);
      }
    );
  }

  voirreparation(id: string) {
    this.router.navigate(['ui-components/lists_reparation_manager', id]); // Redirige vers la page /diagnostic/{id}
  }


}
