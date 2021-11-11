import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FinalProject';

  constructor(
    private authService: AuthService, private router: Router,
    ){

    }

  public isLoggedIn(){
    return this.authService.getIsLoggedIn();
  }

  public logout(){
    this.authService.logout();
    this.router.navigate(["home"]);

  }
}
