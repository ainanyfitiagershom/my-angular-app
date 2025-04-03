import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { RendezVousService } from 'src/app/services/rendezvous/rendezvous.service';
import { CommonModule } from '@angular/common'; // Ajoute CommonModule

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-forms',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    CommonModule
  ],
  templateUrl: './confirmation_rdv_manager.component.html',
})
export class AppConfirmationRdvManagerComponent implements OnInit {
  rdvId: string = '';
  mecaniciens: any[] = [];
  selectedMecanicien: string = '';
  dateDebut: string = '';

  constructor(
    private route: ActivatedRoute,
    private rendezVousService: RendezVousService,
    private router: Router
  ) {}

  ngOnInit() {
    this.rdvId = this.route.snapshot.paramMap.get('id') || '';

    this.rendezVousService.getMecaniciens().subscribe(
      (data) => {
        this.mecaniciens = data;
      },
      (error) => {
        console.error('❌ Erreur lors de la récupération des mécaniciens:', error);
      }
    );
  }

  confirmerRdv() {
    if (!this.dateDebut || !this.selectedMecanicien) {
      alert('Veuillez sélectionner une date et un mécanicien.');
      return;
    }

    const data = {
      date_rendezvous: this.dateDebut,
      mecanicien: this.selectedMecanicien
    };

    this.rendezVousService.confirmerRendezVous(this.rdvId, data).subscribe(
      response => {
        alert('Rendez-vous confirmé avec succès !');
        this.router.navigate(['/ui-components/lists_diag_manager']); // Redirection après confirmation
      },
      error => {
        console.error("❌ Erreur lors de la confirmation :", error);
      }
    );
  }
}
