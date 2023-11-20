import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

url="https://localhost:7078/api/Login/login"
 
 
constructor(private http:HttpClient){}

  login(data:any)
  {
    return this.http.post(this.url,data,{ observe: 'response' })
   
  }




}
