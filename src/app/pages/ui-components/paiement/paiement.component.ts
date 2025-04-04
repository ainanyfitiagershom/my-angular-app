import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PaiementService } from 'src/app/services/paiement/paiement.service';

interface Mode {
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
  ],
  templateUrl: './paiement.component.html',
})
export class AppPaiementComponent {
  country: Mode[] = [
    { value: 'Virement', viewValue: 'Virement' },
    { value: 'Carte', viewValue: 'Carte' },
    { value: 'Espèces', viewValue: 'Espece' },
  ];

  selectedCountry = this.country[2].value;

  idfacture: string | null = '';

  
  selectedMode: string = ''; // Stockera un objet { _id, nom }  // Stocke la pièce sélectionnée
  montant: number = 0; // Stocke la quantité entrée

  constructor(private paiementService: PaiementService,
      private route: ActivatedRoute
    ) {}
  
    ngOnInit() {
       this.idfacture = this.route.snapshot.paramMap.get('id') || "";
    }


onSubmit() {
    if (!this.idfacture) {
      console.error("⚠️ Aucun Facture trouvé !");
      return;
    }
    const data = {
      montant_paye: this.montant,
      mode_paiement: this.selectedMode,
    };

    // Envoie des données au service
    this.paiementService.payerFacture(this.idfacture, data).subscribe(
      (response) => {
        console.log('Paiment envoyée', response);
      },
      (error) => {
        console.error('Erreur lors de l\'envoi de la demande de rendez-vous', error);
      }
    );
  }


}
