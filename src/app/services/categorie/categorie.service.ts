import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  
  private apiUrl = 'http://localhost:5001/api/categorie';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Ajouter une nouvelle catégorie
  createCategorie(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { headers: this.getHeaders() });
  }

  // Récupérer toutes les catégories
  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Récupérer une seule catégorie par ID
  getCategorieById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Mettre à jour une catégorie
  updateCategorie(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  // Supprimer une catégorie
  deleteCategorie(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
