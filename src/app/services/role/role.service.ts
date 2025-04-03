import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:5001/api/role';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Obtenir la liste des rôles
  getRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/roles`, { headers: this.getHeaders() });
  }

  // Obtenir la liste des rôles
  getMecaniciens(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getMecaniciens`, { headers: this.getHeaders() });
  }

  
}
