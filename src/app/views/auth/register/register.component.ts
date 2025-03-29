import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  // onSubmit(form: NgForm) {
  //   if (form.valid) {
  //     console.log(form.value); // { username: '...', password: '...' }
  //   }
  // }

  userObject = {
    "username":"",
    "email":"",
    "password":"",
    "tel":""
  }

  http = inject(HttpClient);

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  registerForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    tel: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
  });

  message: string = '';

  // onSubmit(): void {
  //   if (this.registerForm.invalid) {
  //     console.warn('❌ Formulaire invalide, vérifiez les champs.');
  //     return;
  //   }

  //   console.log('📤 Envoi des données:', this.registerForm.value);

  //   this.authService.userRegister(this.registerForm.value).subscribe({
  //     next: (response) => console.log('✅ Inscription réussie !', response),
  //     error: (error) => console.error('❌ Erreur lors de l’inscription:', error)
  //   });
  // }

  onSaveUser() {
    debugger;
    this.http.post('http://localhost:5001/api/inscription/formulaire', this.userObject).subscribe((res: any) => {
      if (res.result) {
        alert('User added successfully!');
      } else {
        alert('User not added!');
      }
   }) 
  }
}
