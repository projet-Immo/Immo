import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  constructor(protected http : HttpClient) { }

  createCandidat(candidat:any):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}candidats`,candidat)

  }
   updateCandidat(candidatId:any, candidat:any):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}candidats/${candidatId}`,candidat)
   }

   getCandidatId(candidatId:any):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}candidats/${candidatId}`)
   }

   getAllCandidats(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams()
    if(req){
       
      if(req?.matricul != undefined && req?.matricul){
        parametres = parametres.append("matricul", req?.matricul);
      }
      return this.http.get<any>(
        `${environment.baseUrl}candidats/all?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}candidats/all?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

   getAllCandidatsElection(electionId:number): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}candidats/all-candidat-election?idElection=${electionId}`
    );
  }

  deleteCandidat(candidatId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}candidats/${candidatId}`, {
      observe: 'response',
    });
  }

}
