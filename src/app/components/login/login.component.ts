import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  usernameCtl: FormControl;
  passwordCtl: FormControl;

  constructor(private fb: FormBuilder) { 
    this.usernameCtl = this.fb.control(null, Validators.required);
    this.passwordCtl = this.fb.control(null, Validators.required);
    this.userForm = this.fb.group({
      username: this.usernameCtl,
      password: this.passwordCtl
    });
  }

  ngOnInit(): void {
  }

  public submit(){
    
  }

}
