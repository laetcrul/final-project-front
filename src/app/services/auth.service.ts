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
        sessionStorage.setItem('token', user.token.replace('Bearer ', ''));
        sessionStorage.setItem('user', JSON.stringify(user));
        this.isLoggedIn = true;
      }
      return this.isLoggedIn;
    }));
  }

  public logout(){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

  public getIsLoggedIn() : boolean{
    return sessionStorage.getItem('user') != undefined;
  }
}
