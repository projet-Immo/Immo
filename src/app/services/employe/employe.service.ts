import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(protected http : HttpClient) { }

  createEmploye(employe:any):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}employes`,employe)

  }
   updateEmploye(employeId:any, employe:any):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}employes/${employeId}`,employe)
   }

   getEmployeId(employeId:any):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}employes/${employeId}`)
   }

   getAllEmployes(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams()
    if(req){
       
      return this.http.get<any>(
        `${environment.baseUrl}employes/all?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}employes/all?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  deleteEmploye(employeId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}employes/${employeId}`, {
      observe: 'response',
    });
  }

}
