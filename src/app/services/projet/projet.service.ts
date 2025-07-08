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
      if(req?.chef_projet != undefined && req?.chef_projet){
        parametres = parametres.append("chef_projet", req?.chef_projet);
      }
      if(req?.statut_projet != undefined && req?.statut_projet){
        parametres = parametres.append("statut_projet", req?.statut_projet);
      }
      if(req?.pilier_rse != undefined && req?.pilier_rse){
        parametres = parametres.append("pilier_rse", req?.pilier_rse);
      }    
      if(req?.dateDebutPrevu != undefined && req?.dateDebutPrevu){
        parametres = parametres.append("dateDebutPrevu", req?.dateDebutPrevu);
      }    
      if(req?.dateFinPrevu != undefined && req?.dateFinPrevu){
        parametres = parametres.append("dateFinPrevu", req?.dateFinPrevu);
      }    
      if(req?.dateDebutReel != undefined && req?.dateDebutReel){
        parametres = parametres.append("dateDebutReel", req?.dateDebutReel);
      }    
      if(req?.dateFinReel != undefined && req?.dateFinReel){
        parametres = parametres.append("dateFinReel", req?.dateFinReel);
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
