import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FinalProject';

  constructor(
    private authService: AuthService
    ){

    }

  public isLoggedIn(){
    return this.authService.getIsLoggedIn();
  }

  public logout(){
    this.authService.logout();
  }
}
