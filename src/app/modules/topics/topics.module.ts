import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicListComponent } from './pages/topic-list/topic-list.component';
import { TopicRoutingModule } from './topic-routing-module';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { CreateTopicComponent } from './pages/create-topic/create-topic.component';



@NgModule({
  declarations: [
    TopicListComponent,
    TopicFormComponent,
    CreateTopicComponent
  ],
  imports: [
    CommonModule,
    TopicRoutingModule
  ]
})
export class TopicsModule { }