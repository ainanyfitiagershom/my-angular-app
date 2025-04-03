import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeReparationService {
  private apiUrl = 'http://localhost:5001/api/typereparation';

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir les headers avec le token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Ajouter un nouveau type de réparation
  ajouterTypeReparation(data: any): Observable<any> {
    if (data.categories && data.categories._id) {
      data.categories = data.categories._id;
    }
    return this.http.post(`${this.apiUrl}/`, data, { headers: this.getHeaders() });
  }

  // Obtenir tous les types de réparations
  obtenirTypesReparation(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`, { headers: this.getHeaders() });
  }

  // Obtenir un type de réparation par ID
  obtenirTypeReparationParId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Mettre à jour un type de réparation
  mettreAJourTypeReparation(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  // Supprimer un type de réparation
  supprimerTypeReparation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
