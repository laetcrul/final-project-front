import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CreateTopicComponent} from './pages/create-topic/create-topic.component';
import {TopicDetailsComponent} from "./pages/topic-details/topic-details.component";
import {AllTopicsComponent} from "./pages/all-topics/all-topics.component";
import {SubscribedTopicsComponent} from "./pages/subscribed-topics/subscribed-topics.component";
import {FilterEnum} from "../event/filter.enum";
import {MyTopicsComponent} from "./pages/my-topics/my-topics.component";
import {EditTopicComponent} from "./pages/edit-topic/edit-topic.component";

const routes: Routes = [
    {path: 'all', component: AllTopicsComponent},
    {path: 'create', component: CreateTopicComponent},
    {path: 'subscribed', component: SubscribedTopicsComponent, data: {filter: FilterEnum.subscribed}},
    {path: 'created', component: MyTopicsComponent, data: {filter: FilterEnum.created}},
    {path: 'detail', children: [ {
      path: ':id', component: TopicDetailsComponent}
    ]},
    {path: 'edit/:id', component: EditTopicComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TopicRoutingModule { }
