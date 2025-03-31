import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  private apiUrl = 'http://localhost:5001/api/planning';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Ajouter un nouveau planning
  ajouterPlanning(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, data, { headers: this.getHeaders() });
  }

  // Mettre à jour un planning
  mettreAJourPlanning(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  // Supprimer un planning
  supprimerPlanning(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Obtenir les plannings d'un mécanicien
  obtenirPlanningParMecanicien(mecanicienId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${mecanicienId}`, { headers: this.getHeaders() });
  }

  // Obtenir les plannings réservés ou en cours
  obtenirPlanningsReserves(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mecanicien/reserves`, { headers: this.getHeaders() });
  }

  // Obtenir les plannings réservés d'un mécanicien
  obtenirPlanningsReserveesMecanicien(mecanicienId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/parmecanicien/${mecanicienId}`, { headers: this.getHeaders() });
  }

  // Commencer une réparation
  commencerReparation(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/reparation/commencer`, data, { headers: this.getHeaders() });
  }

  // Terminer une réparation
  terminerReparation(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/reparation/terminer`, data, { headers: this.getHeaders() });
  }
}
