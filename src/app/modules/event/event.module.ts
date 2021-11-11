import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';



@NgModule({
  declarations: [
    EventDetailsComponent,
    EventListComponent,
    EventFormComponent,
    CreateEventComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule
  ]
})
export class EventModule { }
