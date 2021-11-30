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
  user: User | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    ){
      if(localStorage.getItem('user')){
        this.user = this.authService.getCurrentUser();
      }
    }

  public isLoggedIn(){
    return this.authService.getIsLoggedIn();
  }

  public logout(){
    this.authService.logout();
    this.router.navigate(["home"]).then(() => window.location.reload());
  }

  public canManageUsers(){
    if(this.user != undefined){
      return this.user.roles.find(role => role.label == "ROLE_MANAGE_USERS") != undefined;
    }
    return false;
  }

  public canManageEvents(){
    if(this.user != undefined){
      return this.user.roles.find(role => role.label == "ROLE_MANAGE_EVENTS") != undefined;
    }
    return false;
  }
}
