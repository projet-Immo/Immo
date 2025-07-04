import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  constructor(protected http : HttpClient) { }

  createElection(election:any):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}elections`,election)

  }
   updateElection(electionId:any, election:any):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}elections/${electionId}`,election)
   }

   getElectionId(electionId:any):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}elections/${electionId}`)
   }

   getAllElections(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams()
    if(req){
          
      return this.http.get<any>(
        `${environment.baseUrl}elections/all?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}elections/all?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  deleteElection(electionId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}elections/${electionId}`, {
      observe: 'response',
    });
  }

}
