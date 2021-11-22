import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import {User} from "./models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user:User | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    ){
      if(sessionStorage.getItem('user')){
        this.user = <User>  JSON.parse(sessionStorage.getItem('user') || "");
      }
    }

  public isLoggedIn(){
    return this.authService.getIsLoggedIn();
  }

  public logout(){
    this.authService.logout();
    this.router.navigate(["home"]);
    window.location.reload();
  }

  public canManageUsers(){
    if(sessionStorage.getItem('user')){
      const user = <User>  JSON.parse(sessionStorage.getItem('user') || "");
      return user.roles.find(role => role.label == "ROLE_MANAGE_USERS") != undefined;
    }
    return false;
  }

  public canManageEvents(){
    if(sessionStorage.getItem('user')){
      const user = <User>  JSON.parse(sessionStorage.getItem('user') || "");
      return user.roles.find(role => role.label == "ROLE_MANAGE_EVENTS") != undefined;
    }
    return false;
  }
}
