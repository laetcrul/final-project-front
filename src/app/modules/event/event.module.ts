import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCreateComponent } from './components/event-form/event-create.component';
import { EventRoutingModule } from './event-routing.module';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';



@NgModule({
  declarations: [
    EventDetailsComponent,
    EventCreateComponent,
    EventListComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule
  ]
})
export class EventModule { }
