import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';

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
  ],
  templateUrl: './confirmation_rdv_manager.component.html',
})
export class AppConfirmationRdvManagerComponent {

  mecanicien: Food[] = [
    { value: 'steak-0', viewValue: 'Koto' },
    { value: 'pizza-1', viewValue: 'Koko' },
    { value: 'tacos-2', viewValue: 'Koka' },
    { value: 'tacos-3', viewValue: 'Koki' },
  ];

  selectedValue = this.mecanicien[0].value;
}
