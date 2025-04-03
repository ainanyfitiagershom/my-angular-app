import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = 'http://localhost:5001/api/facture';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Ajouter une facture
  createFacture(factureData: any): Observable<any> {
    return this.http.post(this.apiUrl, factureData, { headers: this.getHeaders() });
  }

  // Récupérer toutes les factures
  getFactures(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  // Mettre à jour une facture
  updateFacture(id: string, factureData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, factureData, { headers: this.getHeaders() });
  }

  // Supprimer une facture
  deleteFacture(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Voir la facture d'une réparation
  getFactureByReparation(idReparationVoiture: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reparation/${idReparationVoiture}`, { headers: this.getHeaders() });
  }

  // Récupérer les factures d'un client spécifique
  getFacturesByClient(idClient: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/${idClient}`, { headers: this.getHeaders() });
  }

    // Récupérer les factures d'un client spécifique
  getFacturesDetail(idFacture: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/detail/${idFacture}`, { headers: this.getHeaders() });
  }
  
}
