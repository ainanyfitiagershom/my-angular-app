import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  register(userData: { username: string; email: string; mdp: string; tel: string; roleName: string; }) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:5001/api/auth'; 

  constructor(private http: HttpClient, private router: Router) {}

  // Se Connecter
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.message); 
        localStorage.setItem('role', response.role); 
        localStorage.setItem('username', response.username); 
        localStorage.setItem('user', JSON.stringify({ _id: response._id })); 
        console.log("Utilisateur stocké avec succès :", localStorage.getItem('role'));
      })
    );
  }
  
  getUserId(): string {
    return localStorage.getItem('userId') || ''; // Stocké après connexion
  }

  // vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); 
  }

  //se déconnecter
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');  
    localStorage.removeItem('user');
    this.router.navigate(['/authentication/login']);
  }

  // récupérer le token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // récupérer le rôle de l'utilisateur
  getRole(): string | null {
    const role = localStorage.getItem('role');
    return role;
  }

  // récupérer le nom d'utilisateur
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    console.log("Utilisateur récupéré du localStorage :", user);
    return user;
  }
  
}