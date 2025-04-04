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
import { ClientService } from 'src/app/services/client/client.service';


@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule,CommonModule,],
  templateUrl: './register-client.component.html',
})
export class AppRegisterClientComponent {
  options = this.settings.getOptions();

  username: string = '';
  email: string = '';
  password: string = '';
  tel: string = '';
  adresse: string = '';
  

  constructor(private settings: CoreService, private router: Router, private clientService: ClientService) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.registerClient({
      username: this.username,
      email: this.email,
      password: this.password,
      tel: this.tel,
      adresse: this.adresse
    });
  }
  
  registerClient(clientData: any) {
    this.clientService.registerClient(clientData).subscribe({
      next: (res) => {
        alert('✅ Inscription réussie');
        window.location.href = '/authentication/login/client';
        console.log(res);
      },
      error: (err) => {
        alert('❌ Une erreur est survenue');
        console.error(err);
      }
    });
  }
  
  
  
}
