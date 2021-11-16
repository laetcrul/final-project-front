import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TopicListComponent } from './pages/topic-list/topic-list.component';
import { CreateTopicComponent } from './pages/create-topic/create-topic.component';
import {TopicDetailsComponent} from "./pages/topic-details/topic-details.component";
import {SubscribedEventsComponent} from "../event/pages/subscribed-events/subscribed-events.component";

const routes: Routes = [
    {path: 'list', component: TopicListComponent},
    {path: 'create', component: CreateTopicComponent},
    {path: ':id', component: TopicDetailsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TopicRoutingModule { }
