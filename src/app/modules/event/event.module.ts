import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllEventsComponent } from './pages/all-events/all-events.component';
import { SubscribedEventsComponent } from './pages/subscribed-events/subscribed-events.component';
import { MyEventsComponent } from './pages/my-events/my-events.component';



@NgModule({
  declarations: [
    EventDetailsComponent,
    EventListComponent,
    EventFormComponent,
    CreateEventComponent,
    AddressFormComponent,
    AllEventsComponent,
    SubscribedEventsComponent,
    MyEventsComponent,
  ],
  exports: [
    EventListComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class EventModule { }
