import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

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
  ],
  templateUrl: './paiement.component.html',
})
export class AppPaiementComponent {
  country: Food[] = [
    { value: 'steak-0', viewValue: 'Virement' },
    { value: 'pizza-1', viewValue: 'Cheques' },
    { value: 'tacos-2', viewValue: 'Espece' },
  ];

  selectedCountry = this.country[2].value;

}
