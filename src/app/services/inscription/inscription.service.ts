import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private apiUrl = 'http://localhost:5001/api/inscription';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Envoyer le formulaire d'inscription
  inscription(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/formulaire`, data);
  }

  // Valider le code de sécurité pour finaliser l'inscription
  validateCode(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/validateCode`, data);
  }
}
