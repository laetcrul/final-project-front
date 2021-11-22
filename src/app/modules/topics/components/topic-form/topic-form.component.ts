import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TopicService } from 'src/app/services/topic.service';
import { Topic } from 'src/app/models/topic.model';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss']
})

export class TopicFormComponent implements OnInit {
  topicForm : FormGroup;
  nameCtl: FormControl;
  descriptionCtl: FormControl;
  imageCtl: FormControl;

  topic! : Topic;

  @Output() topicEvent = new EventEmitter<Topic>();

  constructor(private fb: FormBuilder, private topicService : TopicService, private route: ActivatedRoute) {
    const id = parseInt(this.route.snapshot.paramMap.get("id") || "");
    if (!isNaN(id)){
      topicService.getOneById(id).subscribe((topic) => {
        this.topic = topic;
      });
    }


    this.nameCtl = fb.control([this.topic?.name],[Validators.required, Validators.maxLength(30)]);
    this.descriptionCtl = fb.control([this.topic?.description], Validators.maxLength(500));
    this.imageCtl = fb.control([this.topic?.image], Validators.maxLength(200));
    this.topicForm = fb.group({
      name: this.nameCtl,
      description: this.descriptionCtl,
      image: this.imageCtl
    });
  }

  ngOnInit(): void {
  }

  public submit(){
    if(this.topicForm.valid){
      const topic = this.topicForm.value as Topic;

      if(!this.nameCtl.dirty){
        topic.name = this.topic.name;
      }

      if(!this.descriptionCtl.dirty){
        topic.description = this.topic.description;
      }

      if(!this.imageCtl.dirty){
        topic.image = this.topic.image;
      }

      this.topicEvent.emit(topic);
    }
  }
}
