import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelService } from 'src/app/services/model/model.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-model',
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
  templateUrl: './update_model.component.html',
  styleUrls: ['./update_model.component.css']
})
export class AppUpdateModelComponent implements OnInit {
  modelId!: string;
  modelName!: string;
  selectedMarque!: string;
  selectedTypeVehicule!: string;
  marques: any[] = [];
  typeVehicules: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private modelService: ModelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.modelId = this.route.snapshot.paramMap.get('id')!;
  
    if (!this.modelId) {
      console.error("Erreur: ID du modèle introuvable !");
      return;
    }
  
    this.modelService.getModelById(this.modelId).subscribe(model => {
      if (!model) {
        console.error("Erreur: Modèle non trouvé !");
        return;
      }
  
      this.modelName = model.name || "";
      this.selectedMarque = model.marque || "";
      this.selectedTypeVehicule = model.typeVehicule || "";
    });
  
    // Charger les listes de marques et types de véhicules
    this.modelService.getMarques().subscribe(data => this.marques = data);
    this.modelService.getTypeVehicules().subscribe(data => this.typeVehicules = data);
  }
  

  updateModel(): void {
    const updatedModel = {
      name: this.modelName,
      marque: this.selectedMarque,
      typeVehicule: this.selectedTypeVehicule
    };

    this.modelService.updateModel(this.modelId, updatedModel).subscribe(() => {
      alert('Modèle mis à jour avec succès');
      window.location.href = '/ui-components/model';
    }, error => {
      console.error('Erreur lors de la mise à jour :', error);
    });
  }
}
