import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import { MaterialModule } from 'src/app/material.module';


export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-lists',
  imports: [MatListModule, MatCardModule, DatePipe, MatIconModule, MaterialModule ],
  templateUrl: './liste_facture.component.html',
})
export class AppListeFactureComponent {
  constructor() {}

  
}
