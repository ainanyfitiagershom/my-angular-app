import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  private apiUrl = 'http://localhost:5001/api/voiture';

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir les headers avec le token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Ajouter une voiture pour un client donné
  ajouterVoiture(clientId: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${clientId}`, data, { headers: this.getHeaders() });
  }

  // Obtenir toutes les voitures
  obtenirToutesVoitures(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`, { headers: this.getHeaders() });
  }

  // Obtenir une voiture par ID
  obtenirVoitureParId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Mettre à jour une voiture
  mettreAJourVoiture(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  // Supprimer une voiture
  supprimerVoiture(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Obtenir les voitures d'un client spécifique
  obtenirVoituresParClient(clientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/${clientId}`, { headers: this.getHeaders() });
  }
}
