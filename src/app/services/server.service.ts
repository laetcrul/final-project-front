import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const SERVER_URL: string = environment.api.url;
  
@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private jwt: JwtHelperService = new JwtHelperService;

  constructor(private http: HttpClient) { }

  public get<T>(url: string): Observable<T>{
    return this.http.get<T>(SERVER_URL + url);
  }

  public post<T>(url:string, body: T): Observable<T>{
    return this.http.post<T>(SERVER_URL + url, body);
  }

  public put<T>(url:string, body : T): Observable<T>{
    return this.http.put<T>(SERVER_URL + url, body);
  }

  public delete<T>(url:string): Observable<T>{
    return this.http.delete<T>(SERVER_URL + url);
  }
}