import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:5001/api/client';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Ajouter un nouveau client
  createClient(clientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Client`, clientData);
  }

  // Récupérer un client par ID
  getClientById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Récupérer tous les clients
  getClients(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  // Mettre à jour un client
  updateClient(id: string, clientData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, clientData, { headers: this.getHeaders() });
  }

  // Supprimer un client
  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
