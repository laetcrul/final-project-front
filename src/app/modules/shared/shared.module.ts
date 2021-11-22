import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterPipe} from "../../pipes/filter.pipe";
import {RolePipe} from "../../pipes/role.pipe";
import {EventDatesPipe} from "../../pipes/event-dates.pipe";



@NgModule({
  declarations: [
    FilterPipe,
    RolePipe,
    EventDatesPipe
  ],
  exports: [
    FilterPipe,
    RolePipe,
    EventDatesPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
