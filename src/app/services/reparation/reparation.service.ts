import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReparationService {
  private apiUrl = 'http://localhost:5001/api/reparation';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Ajouter une nouvelle réparation
  ajouterReparation(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, data, { headers: this.getHeaders() });
  }

  // Ajouter un détail de réparation
  ajouterDetailReparation(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/details`, data, { headers: this.getHeaders() });
  }

  // Obtenir toutes les réparations
  obtenirReparations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`, { headers: this.getHeaders() });
  }

  // Supprimer un détail de réparation
  supprimerDetailReparation(idReparation: string, idDetail: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idReparation}/details/${idDetail}`, { headers: this.getHeaders() });
  }


  
  // Valider ou annuler un détail de réparation
  voirDetailTypeReparation(idReparation: string, idTypeReparation: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/detail/${idReparation}/${idTypeReparation}`, { headers: this.getHeaders() });
  }


  // Creer reparation 
  assignerMecanicien(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/assigner-mecanicien`, data, { headers: this.getHeaders() });
  }


  // Assigner un mécanicien à une réparation
  creationreparation(idDiagnostic: string ,data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/creation-reparation/${idDiagnostic}`, data, { headers: this.getHeaders() });
  }

    // Valider ou annuler un détail de réparation
  validerDetailManager(idReparation: string, idTypeReparation: string): Observable<any> {
      return this.http.put(`${this.apiUrl}/valider/${idReparation}/${idTypeReparation}`, {}, { headers: this.getHeaders() });
  }

  
  // Valider une réparation
  validerReparation(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/valider/${id}`, { headers: this.getHeaders() });
  }

  // Valider ou annuler un détail de réparation
  validerOuAnnulerDetail(idClient: string,idReparation: string, idTypeReparation: string, action: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${idClient}/${idReparation}/${idTypeReparation}/action/${action}`, {}, { headers: this.getHeaders() });
  }

  // Choisir si une pièce est prise ou non
  choisirPiece(idReparation: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${idReparation}`, data, { headers: this.getHeaders() });
  }

  // Valider une réparation et générer une facture
  validerEtFacturer(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/clientvalider/${id}`, {}, { headers: this.getHeaders() });
  }

    // Valider ou annuler un détail de réparation
    voirdetailReparation(idReparation: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/voir/${idReparation}`, { headers: this.getHeaders() });
    }

     // Valider ou annuler un détail de réparation
     getReparationbydiag(idDiagnostic: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/bydiag/${idDiagnostic}`, { headers: this.getHeaders() });
    }

    

    enregistrerDetailReparation(
      idReparationVoiture: string, 
      idTypeReparation: string, 
      idNiveau: string, 
      pieces: any[]
    ): Observable<any> {
      const payload = {
        idTypeReparation,
        idNiveau,
        pieces
      };
      return this.http.post(`${this.apiUrl}/ajouter/${idReparationVoiture}`, payload , { headers: this.getHeaders() });
    }


}
