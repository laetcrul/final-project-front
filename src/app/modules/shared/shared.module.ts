import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterPipe} from "../../pipes/filter.pipe";
import {RolePipe} from "../../pipes/role.pipe";



@NgModule({
  declarations: [
    FilterPipe,
    RolePipe
  ],
  exports: [
    FilterPipe,
    RolePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
