import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 email: string = '';
        password: string = '';
        checked: boolean = false;
    
        constructor(private authService: AuthService, private router: Router) {}
    
        onSubmit() {
            const loginData = {
            email: this.email,
            password: this.password
            };
        
            console.log('Données envoyées :', loginData);
        
            this.authService.login(loginData).subscribe({
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
