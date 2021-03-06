import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import {UserRoutingModule} from "./user-routing-module";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    UserListComponent,
    AllUsersComponent,
  ],
  exports: [
    UserListComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class UserModule { }
