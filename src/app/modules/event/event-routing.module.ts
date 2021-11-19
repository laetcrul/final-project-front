import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CreateEventComponent} from './pages/create-event/create-event.component';
import {AllEventsComponent} from "./pages/all-events/all-events.component";
import {SubscribedEventsComponent} from "./pages/subscribed-events/subscribed-events.component";
import {FilterEnum} from "./filter.enum";
import {MyEventsComponent} from "./pages/my-events/my-events.component";
import {TopicDetailsComponent} from "../topics/pages/topic-details/topic-details.component";
import {EventDetailsComponent} from "./pages/event-details/event-details.component";
import {EditEventComponent} from "./pages/edit-event/edit-event.component";
import {element} from "../../enums/element.enum";

const routes: Routes = [
    {path: 'all', component: AllEventsComponent},
    {path: 'create', component: CreateEventComponent},
    {path: 'subscribed', component: SubscribedEventsComponent, data: {filter: FilterEnum.subscribed}},
    {path: 'created', component: MyEventsComponent, data: {filter: FilterEnum.created}},
    {path: 'detail', children: [ {
      path: ':id', component: EventDetailsComponent},
      ], data: {element: element.event}},
    {path: 'edit/:id', component: EditEventComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class EventRoutingModule { }
