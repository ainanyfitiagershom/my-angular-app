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
  templateUrl: './lists_clients.component.html',
})
export class AppListsClientsComponent {
  clients: any[] = [];
  displayedColumns: string[] = ['numero', 'nom', 'email', 'contact', 'adresse', 'type_client', 'createdAt', 'action'];  // Colonnes du tableau

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getClients();
  }

  // Récupérer tous les clients
  getClients(): void {
    this.clientService.getClients().subscribe(
      (data) => {
        console.log('Clients récupérés :', data);
        this.clients = data;  // Stocker les clients dans le tableau
      },
      (error) => {
        console.error('Erreur lors de la récupération des clients', error);
      }
    );
  }

  supprimerClient(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer cette marque ?')) {
      this.clientService.deleteClient(id).subscribe(
        () => {
          alert('✅ Client supprimée avec succès !');
          this.getClients(); // Recharger la liste après suppression
        },
        (error) => {
          console.error('❌ Erreur lors de la suppression :', error);
        }
      );
    }
  }
  
}
