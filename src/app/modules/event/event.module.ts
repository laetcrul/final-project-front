import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventCreateComponent } from './components/event-form/event-create.component';
import { EventRoutingModule } from './event-routing.module';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventCardComponent } from './components/event-card/event-card.component';



@NgModule({
  declarations: [
    EventDetailsComponent,
    EventCreateComponent,
    EventListComponent,
    EventCardComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule
  ]
})
export class EventModule { }
