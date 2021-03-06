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
import { EditEventComponent } from './pages/edit-event/edit-event.component';
import {UserModule} from "../user/user.module";
import {SharedModule} from "../shared/shared.module";
import { AllEventsAdminComponent } from './pages/all-events-admin/all-events-admin.component';



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
    EditEventComponent,
    AllEventsAdminComponent,
  ],
  exports: [
    EventListComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    UserModule,
    SharedModule,
  ]
})
export class EventModule { }
