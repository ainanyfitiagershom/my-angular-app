import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonModule } from '@angular/common';  // Ajouter cet import
import { RoleService } from 'src/app/services/role/role.service';


@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule,CommonModule,],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();

  nom: string = '';
  email: string = '';
  mdp: string = '';
  contact: string = '';
  roleName: string = '';  // Valeur par défaut vide
  roles: any[] = [];  // Liste des rôles récupérée depuis le backend
  salaire_mensuel: number = 0;


  constructor(private settings: CoreService, private router: Router, private authService: AuthService, private roleService: RoleService) {}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(
      (roles) => {
        this.roles = roles; // Affecte les rôles récupérés à la variable roles
      },
      (error) => {
        console.error("Erreur lors de la récupération des rôles", error);
      }
    );
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    const token = localStorage.getItem('token') ?? undefined;  // Si token est null, utiliser undefined
  
    this.authService.registerUser(this.nom, this.email, this.mdp, this.contact, this.roleName, this.salaire_mensuel, token)
    .subscribe(
        response => {
          console.log('Utilisateur créé avec succès !', response);
          // Redirection ou message de confirmation ici
        },
        error => {
          console.error('Erreur lors de l\'inscription', error);
          // Gestion des erreurs ici
        }
      );
  }
  
  
}
