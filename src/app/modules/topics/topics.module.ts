import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicListComponent } from './pages/topic-list/topic-list.component';
import { TopicRoutingModule } from './topic-routing-module';



@NgModule({
  declarations: [
    TopicListComponent
  ],
  imports: [
    CommonModule,
    TopicRoutingModule
  ]
})
export class TopicsModule { }