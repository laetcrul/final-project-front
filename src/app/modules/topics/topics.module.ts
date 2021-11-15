import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicListComponent } from './pages/topic-list/topic-list.component';
import { TopicRoutingModule } from './topic-routing-module';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { CreateTopicComponent } from './pages/create-topic/create-topic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopicDetailsComponent } from './pages/topic-details/topic-details.component';



@NgModule({
  declarations: [
    TopicListComponent,
    TopicFormComponent,
    CreateTopicComponent,
    TopicDetailsComponent
  ],
  imports: [
    CommonModule,
    TopicRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TopicsModule { }

