import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import {UserRoutingModule} from "./user-routing-module";
import {FormsModule} from "@angular/forms";
import {FilterPipe} from "../../pipes/filter.pipe";

@NgModule({
  declarations: [
    UserListComponent,
    AllUsersComponent,
    FilterPipe
  ],
  exports: [
    UserListComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
  ]
})
export class UserModule { }
