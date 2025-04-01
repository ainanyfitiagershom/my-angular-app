import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:5001/api/client';

  constructor(private http: HttpClient) {}

  loginClient(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token); 
  
        localStorage.setItem('username', response.username); 
        localStorage.setItem('user', JSON.stringify({ _id: response._id })); 
        
        if (response.role) {
          localStorage.setItem('role', response.role);
        }
  
        console.log(this.getUserId())
        console.log("🔐 Connexion réussie - Utilisateur stocké :", response);
      })
    );
  }


  getUserId(): string {
    return localStorage.getItem('user') || ''; // Stocké après connexion
  }


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
