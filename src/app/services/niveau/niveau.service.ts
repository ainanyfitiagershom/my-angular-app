import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {
  private apiUrl = 'http://localhost:5001/api/niveau';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Ajouter un niveau
  ajouterNiveau(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data, { headers: this.getHeaders() });
  }

  // Récupérer tous les niveaux
  obtenirNiveaux(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { headers: this.getHeaders() });
  }

  // Récupérer un niveau par ID
  obtenirNiveauParId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Mettre à jour un niveau
  mettreAJourNiveau(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  // Supprimer un niveau
  supprimerNiveau(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
