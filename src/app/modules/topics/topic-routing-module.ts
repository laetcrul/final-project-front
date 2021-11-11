import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TopicListComponent } from './pages/topic-list/topic-list.component';

const routes: Routes = [
    {path: 'list', component: TopicListComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TopicRoutingModule { }