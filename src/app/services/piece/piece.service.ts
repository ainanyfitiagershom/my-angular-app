import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PieceService {
  private apiUrl = 'http://localhost:5001/api/piece';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Ajouter une nouvelle pièce
  ajouterPiece(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, data, { headers: this.getHeaders() });
  }

  // Obtenir toutes les pièces
  obtenirPieces(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`, { headers: this.getHeaders() });
  }

  // Obtenir une pièce par ID
  obtenirPieceParId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Mettre à jour une pièce
  mettreAJourPiece(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  // Supprimer une pièce
  supprimerPiece(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
