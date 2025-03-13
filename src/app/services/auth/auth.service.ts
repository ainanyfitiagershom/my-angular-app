import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; 

export interface User {
  username: string;
  email: string;
  password: string;
  tel: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private users = signal<User[]>([])
  readonly url = 'http://localhost:5001/api/inscription'; 


  userRegister(data: User): Observable<any> {
    console.log('Attempting to register user with data:', data); 
    return this.http.post(`${this.url}/formulaire`, data).pipe(
      // Ajout d'une gestion de la réponse
      tap(response => {
        console.log('Registration response:', response); // Log de la réponse
      }, error => {
        console.error('Registration error:', error); // Log de l'erreur en cas de problème
      })
    );
  }
}
