import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObjectifService {

  constructor(protected http : HttpClient) { }

  getObjectifsByProjetId(projetId: number): Observable<any> {
  return this.http.get<any>(`${environment.baseUrl}objectifs/projet/${projetId}`);
}

  createObjectifs(objectif:any):Observable<any>{
      return this.http.post<any>(`${environment.baseUrl}objectifs/create`,objectif)
  
    }
 updateObjectifs(objectifId:any, objectif:any):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}objectifs/${objectifId}`,objectif)
   }

   getObjectifsId(objectifId:any):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}objectifs/${objectifId}`)
   }

   deleteObjectifs(objectifId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}objectifs/${objectifId}`, {
      observe: 'response',
    });
  }

  getAllObjectifs(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}objectifs/all`);
  }

  
   // ✅ Rechercher des objectifs par type et/ou dates
  searchObjectifs(typeObjectif?: string, dateDebut?: string, dateFin?: string): Observable<any> {
    let params = new HttpParams();

    if (typeObjectif) {
      params = params.set('typeObjectif', typeObjectif);
    }
    if (dateDebut) {
      params = params.set('dateDebut', dateDebut);
    }
    if (dateFin) {
      params = params.set('dateFin', dateFin);
    }

    return this.http.get<any>(`${environment.baseUrl}objectifs/search`, { params });
  }
}
