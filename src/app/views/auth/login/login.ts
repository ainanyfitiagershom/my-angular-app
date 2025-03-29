import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    template: ` `
})
    export class Login {
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
