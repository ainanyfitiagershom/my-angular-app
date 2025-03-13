import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm , ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  // onSubmit(form: NgForm) {
  //   if (form.valid) {
  //     console.log(form.value); // { username: '...', password: '...' }
  //   }
  // }

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  registerForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    tel: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
  });

  message: string = '';

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.userRegister(this.registerForm.value).subscribe({
        next: (response) => {
          this.message = 'Inscription réussie ! Vérifiez votre e-mail pour le code de validation.';
        },
        error: (err) => {
          this.message = err.error.erreur || 'Erreur lors de l\'inscription';
        }
      });
    }
  }
}
