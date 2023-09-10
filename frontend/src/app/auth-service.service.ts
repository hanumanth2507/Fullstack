import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }
  login(data: any):Observable<any>{
    return this.http.post(`${baseUrl}/login`,data);
  }
  register(data: any):Observable<any>{
    return this.http.post(`${baseUrl}/register`,data);
  }
  employeesDetails():Observable<any>{
    return this.http.get(`${baseUrl}/employees`);
  }
  employeesEdit(data: any):Observable<any>{
    return this.http.put(`${baseUrl}/edit/:id`, data);
  }
}
