import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private apiUrl = 'http://localhost:5001/api/rdv';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Ajouter un rendez-vous
  ajouterRendezVous(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, data, { headers: this.getHeaders() });
  }

  // Mettre à jour un rendez-vous
  mettreAJourRendezVous(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  // Supprimer un rendez-vous
  supprimerRendezVous(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Obtenir les rendez-vous en attente
  obtenirRendezVousEnAttente(): Observable<any> {
    return this.http.get(`${this.apiUrl}/liste/attente`, { headers: this.getHeaders() });
  }

  // Obtenir les détails d'un rendez-vous spécifique
  obtenirRendezVousParId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Demande de rendez-vous par un client
  demanderRendezVous(clientId: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/demandeRendezVoususer/${clientId}`, data, { headers: this.getHeaders() });
  }

  // Confirmer un rendez-vous
  confirmerRendezVous(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/confirmer/${id}`, data, { headers: this.getHeaders() });
  }

  // Obtenir les rendez-vous d'un client
  obtenirRendezVousParClient(clientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/${clientId}`, { headers: this.getHeaders() });
  }

  // Obtenir les rendez-vous validés avec diagnostics pour un client
  obtenirRendezVousValidAvecDiagnostic(clientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/${clientId}/rendez-vous-valides`, { headers: this.getHeaders() });
  }

  // Valider ou annuler un rendez-vous
  actionRendezVous(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/action/${id}`, data, { headers: this.getHeaders() });
  }

  getMecaniciens(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/mecaniciens`, { headers: this.getHeaders() });
  } 
}
