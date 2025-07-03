import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(protected http : HttpClient) { }

   getActivityId(activityId:any):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}activities/${activityId}`)
   }

   getAllActivities(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams()
    if(req){
      return this.http.get<any>(
        `${environment.baseUrl}activities/all?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}activities/all?page=${0}&size=${10}`,{
          params: parametres
        }
      );
    }
  }


}
