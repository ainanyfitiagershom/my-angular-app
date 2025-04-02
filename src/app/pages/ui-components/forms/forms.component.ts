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
import { VoitureService } from '../../../services/voiture/voiture.service';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { CommonModule } from '@angular/common'; // Ajoute CommonModule
import { RendezVousService } from '../../../services/rendezvous/rendezvous.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-forms',
  imports: [
    CommonModule,
    MatListModule,
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
  templateUrl: './forms.component.html',
})
export class AppFormsComponent {

  voitures: any[] = [];
  categories: any[] = [];

  //pour la demande 
  selectedVoiture: string = ''; // ID de la voiture
  selectedCategories: string[] = []; // Liste des catégories sélectionnées
  rdvDate: string = ''; // Date et heure du RDV
  commentaire: string = ''; // Commentaire optionnel

  // Propriétés pour les messages
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showMessage: boolean = false;

  constructor(
    private voitureService: VoitureService,
    private categorieService: CategorieService , // Injection du service pour récupérer les catégories
    private rendezVousService: RendezVousService 
    
  ) {}

  ngOnInit(): void {
    this.chargerVoitures();
    this.chargerCategories();
  }

  private showAlert(type: 'success' | 'error', message: string) {
    this.messageType = type;
    this.message = message;
    this.showMessage = true;
    
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }

  chargerVoitures() {
    const client = JSON.parse(localStorage.getItem('user') || '{}');
    if (!client._id) {
      console.error("⚠️ Aucun client connecté !");
      return;
    }

    this.voitureService.obtenirVoituresParClient(client._id).subscribe({
      next: (data) => {
        // Vérification si 'data.voitures' existe et est un tableau
        if (data && Array.isArray(data.voitures)) {
          // Mapping des voitures pour afficher le nom du modèle et la marque
          this.voitures = data.voitures.map((v: any) => ({
            value: v._id,
            viewValue: `${v.model.name} - ${v.energie.nom} (${v.transmission.nom})`,  // Affichage du modèle, de l'énergie et de la transmission
          }));
        } else {
          console.error("Données invalides", data);
        }
      },
      error: (err) => console.error("Erreur lors du chargement des voitures", err),
    });
  }

  chargerCategories() {
    this.categorieService.getCategories().subscribe({
      next: (data) => {
        if (data && Array.isArray(data)) {
          // Extraire uniquement le nom des catégories
          this.categories = data;  // On prend le champ 'nom' de chaque catégorie
        } else {
          console.error("Données invalides pour les catégories", data);
        }
      },
      error: (err) => console.error("Erreur lors du chargement des catégories", err),
    });
  }

  onSubmit() {
    console.log('Catégories sélectionnées :', this.selectedCategories);
    const client = JSON.parse(localStorage.getItem('user') || '{}');
    if (!client._id) {
      console.error("⚠️ Aucun client connecté !");
      return;
    }
    const demandeRdvData = {
      voiture: this.selectedVoiture,
      problemes: this.selectedCategories,
      date_heure_rdv: this.rdvDate,
      commentaire: this.commentaire,
    };

    // Envoie des données au service
    this.rendezVousService.demanderRendezVous(client._id, demandeRdvData).subscribe(
      (response) => {
        console.log('Demande de rendez-vous envoyée', response);
        this.showAlert('success', 'Demande de rendez-vous envoyée');
      },
      (error) => {
        console.error('Erreur lors de l\'envoi de la demande de rendez-vous', error);
      }
    );
  }

  typesOfShoes: string[] = ['Frein', 'Embreage', 'Accélérateur', 'Vitesses', 'Clignotants', 'Essuie-glaces', 'Phare', 'Klaxon', 'Rétroviseur'];
}
