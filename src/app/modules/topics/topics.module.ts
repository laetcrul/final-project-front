import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicListComponent } from './components/topic-list/topic-list.component';
import { TopicRoutingModule } from './topic-routing-module';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { CreateTopicComponent } from './pages/create-topic/create-topic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TopicDetailsComponent} from "./pages/topic-details/topic-details.component";
import {EventModule} from "../event/event.module";
import { AllTopicsComponent } from './pages/all-topics/all-topics.component';
import { SubscribedTopicsComponent } from './pages/subscribed-topics/subscribed-topics.component';
import { MyTopicsComponent } from './pages/my-topics/my-topics.component';
import { EditTopicComponent } from './pages/edit-topic/edit-topic.component';

@NgModule({
  declarations: [
    TopicListComponent,
    TopicFormComponent,
    CreateTopicComponent,
    TopicDetailsComponent,
    AllTopicsComponent,
    SubscribedTopicsComponent,
    MyTopicsComponent,
    EditTopicComponent,
  ],
  imports: [
    CommonModule,
    TopicRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    EventModule
  ]
})
export class TopicsModule { }

