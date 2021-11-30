import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { ServerService } from './server.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;

  constructor(private server: ServerService) { }

  public login(user: User){
    return this.server.post<User>('login', user)
    .pipe(map((user: User) => {
      if(user.token){
        localStorage.setItem('token', user.token.replace('Bearer ', ''));
        localStorage.setItem('user', JSON.stringify(user));
        this.isLoggedIn = true;
      }
      return this.isLoggedIn;
    }));
  }

  public logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  public getIsLoggedIn() : boolean{
    return localStorage.getItem('user') != undefined;
  }

  public isAdmin(){
    const user: User = <User>  JSON.parse(localStorage.getItem('user') || "");
    return user.group.id == 2;
  }

  public getCurrentUser(){
    return <User>JSON.parse(localStorage.getItem('user') || "");
  }
}
