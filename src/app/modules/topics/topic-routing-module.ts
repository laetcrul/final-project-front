import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TopicListComponent } from './pages/topic-list/topic-list.component';
import { CreateTopicComponent } from './pages/create-topic/create-topic.component';

const routes: Routes = [
    {path: 'list', component: TopicListComponent},
    {path: 'create', component: CreateTopicComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TopicRoutingModule { }