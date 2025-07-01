import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(protected http : HttpClient) { }

  createProjet(projet:any):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}projets`,projet)

  }
   updateProjet(projetId:any, projet:any):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}projets/${projetId}`,projet)
   }

   getProjetId(projetId:any):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}projets/${projetId}`)
   }

   getProjetName(projetName:any):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}projets/name/${projetName}`)
   }

   getAllProjets(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams()
    if(req){
      if(req?.name != undefined && req?.name){
        parametres = parametres.append("name", req?.name);
      }
      if(req?.lastName != undefined && req?.lastName){
        parametres = parametres.append("lastName", req?.lastName);
      }
      if(req?.sexe != undefined && req?.sexe){
        parametres = parametres.append("sexe", req?.sexe);
      }
      if(req?.address != undefined && req?.address){
        parametres = parametres.append("address", req?.address);
      }    
      return this.http.get<any>(
        `${environment.baseUrl}projets/all?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}projets/all?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  deleteProjet(projetId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}projets/${projetId}`, {
      observe: 'response',
    });
  }

}
