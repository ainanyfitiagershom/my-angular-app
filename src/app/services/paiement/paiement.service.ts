import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private apiUrl = 'http://localhost:5001/api/paiement';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Valider un paiement
  validerPaiement(idPaiement: string, detailPaiementId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/valider/${idPaiement}/${detailPaiementId}`, {}, { headers: this.getHeaders() });
  }

  // Ajouter un paiement partiel
  ajouterPaiementPartiel(idPaiement: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/paiement/ajouter/${idPaiement}`, data, { headers: this.getHeaders() });
  }

  // Effectuer un paiement sur une facture
  payerFacture(idFacture: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/payer/${idFacture}`, data, { headers: this.getHeaders() });
  }

    // Récupérer les factures d'un client spécifique
  getPaimentsByClient(idClient: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/${idClient}`, { headers: this.getHeaders() });
  }
  
}
