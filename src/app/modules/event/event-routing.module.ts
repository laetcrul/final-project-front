import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import {AllEventsComponent} from "./pages/all-events/all-events.component";
import {SubscribedEventsComponent} from "./pages/subscribed-events/subscribed-events.component";

const routes: Routes = [
    {path: 'all', component: AllEventsComponent},
    {path: 'create', component: CreateEventComponent},
    {path: 'subscribed', component: SubscribedEventsComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class EventRoutingModule { }
