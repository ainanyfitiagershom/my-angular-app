import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login-client',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-client.component.html',
})
export class AppLoginClientComponent {

  constructor(private authService: AuthService, private router: Router) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    mdp: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    this.router.navigate(['']);
  }


  email: string = "";
  mdp: string = "";
  
  checked: boolean = false;

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.mdp
    };
  
    console.log('Données envoyées :', loginData);
  
    this.authService.loginClient(loginData).subscribe({
      next: (response) => {
        console.log('Connexion réussie', response);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erreur de connexion', err);
        alert(err.error.erreur || 'Une erreur est survenue');
      }
    });
  }
  


  

}
