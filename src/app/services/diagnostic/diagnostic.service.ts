import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {
  private apiUrl = 'http://localhost:5001/api/diagnostic';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Ajouter un diagnostic
  createDiagnostic(diagnosticData: any): Observable<any> {
    return this.http.post(this.apiUrl, diagnosticData, { headers: this.getHeaders() });
  }

  // Récupérer tous les diagnostics
  getDiagnostics(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  // Récupérer un diagnostic par ID
  getDiagnosticById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Mettre à jour un diagnostic
  updateDiagnostic(id: string, diagnosticData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, diagnosticData, { headers: this.getHeaders() });
  }

  // Supprimer un diagnostic
  deleteDiagnostic(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Récupérer les diagnostics d'un mécanicien
  getDiagnosticsByMecanicien(mecanicienId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/mecanicien/${mecanicienId}`, { headers: this.getHeaders() });
  }

  // Récupérer les diagnostics d'un client
  getDiagnosticsByClient(clientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/${clientId}`, { headers: this.getHeaders() });
  }

  // Déposer une voiture pour diagnostic
  deposerVoiture(idrdv: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/deposer/${idrdv}`, { headers: this.getHeaders() });
  }

  // Récupérer la liste des diagnostics terminés
  getDiagnosticsTermines(): Observable<any> {
    return this.http.get(`${this.apiUrl}/liste/termines`, { headers: this.getHeaders() });
  }

  // Récupérer la réparation par ID de diagnostic
  getReparationByDiagnostic(idDiagnostic: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reparations/${idDiagnostic}`, { headers: this.getHeaders() });
  }
}
