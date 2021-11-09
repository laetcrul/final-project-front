import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventCreateComponent } from './components/event-form/event-create.component';
import { EventRoutingModule } from './event-routing.module';



@NgModule({
  declarations: [
    EventListComponent,
    EventDetailsComponent,
    EventCreateComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule
  ]
})
export class EventModule { }
