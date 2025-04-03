import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FactureService } from 'src/app/services/facture/facture.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; // Assure-toi aussi que Angular Material est importé
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-liste-facture',
  imports: [MaterialModule,   
           CommonModule,
          MatCardModule 
  ],
  templateUrl: './facture.component.html'
})
export class AppFactureComponent implements OnInit {
  facture: any;

  constructor(private factureService: FactureService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idFacture = this.route.snapshot.paramMap.get('id') || "";
    this.getFacture(idFacture);
  }

  getFacture(id :string) {
    this.factureService.getFacturesDetail(id).subscribe(
      (data: any) => {
        this.facture = data.facture; // Stocke la facture récupérée
      },
      (error) => {
        console.error("Erreur lors de la récupération de la facture :", error);
      }
    );
  }
}
