import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TopicService } from 'src/app/services/topic.service';
import { Topic } from 'src/app/models/topic.model';
import { User } from "../../../../models/user.model";
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
    topicService.getOneById(id).subscribe((topic) => {
      this.topic = topic;
      console.log(topic);
    });

    this.nameCtl = fb.control(null,[Validators.required, Validators.maxLength(30)]);
    this.descriptionCtl = fb.control(null, Validators.maxLength(500));
    this.imageCtl = fb.control(null, Validators.maxLength(200));
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
      this.topicEvent.emit(topic);
    }
  }
}
