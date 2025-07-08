import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(protected http : HttpClient) { }

  createService(service:any):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}services`,service)

  }
   updateService(serviceId:any, service:any):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}services/${serviceId}`,service)
   }

   getServiceId(serviceId:any):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}services/${serviceId}`)
   }

   getAllServices(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams()
    if(req){
      
      return this.http.get<any>(
        `${environment.baseUrl}services/all?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}services/all?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  deleteService(serviceId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}services/${serviceId}`, {
      observe: 'response',
    });
  }

}
