import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(protected http : HttpClient) { }

  createVote(vote:any):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}votes`,vote)

  }
   updateVote(voteId:any, vote:any):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}votes/${voteId}`,vote)
   }

   getVoteId(voteId:any):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}votes/${voteId}`)
   }

   getVoteEmployeElection(matricul:string, electionId:number):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}votes/employe/isvote?matricul=${matricul}&electionId=${electionId}`)
   }

  getAllVotes(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams()
    if(req){
      
      if(req?.name != undefined && req?.name){
        parametres = parametres.append("name", req?.name);
      }
      return this.http.get<any>(
        `${environment.baseUrl}votes/all?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}votes/all?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  deleteVote(voteId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}votes/${voteId}`, {
      observe: 'response',
    });
  }

}
