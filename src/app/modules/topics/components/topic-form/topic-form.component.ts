import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TopicService} from 'src/app/services/topic.service';
import {Topic} from 'src/app/models/topic.model';
import {ActivatedRoute} from "@angular/router";
import {F_topic} from "./topic-form";

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss']
})

export class TopicFormComponent implements OnInit {
  updateForm = new FormGroup(F_topic);
  topic: Topic | undefined;

  @Output() topicEvent = new EventEmitter<Topic>();

  constructor(private fb: FormBuilder, private topicService: TopicService, private route: ActivatedRoute) {
    const id = parseInt(this.route.snapshot.paramMap.get("id") || "");
    if (!isNaN(id)) {
      topicService.getOneById(id).subscribe((topic) => {
        this.updateForm.setValue({
          name: topic.name,
          description: topic.description,
          image: topic.image
          });
        this.topic = topic;
      });
    }
  }

  ngOnInit(): void {}

  public submit() {
    if(this.updateForm.valid){
      const topic = this.updateForm.value;
      this.topicEvent.emit(topic);
    }
  }
}
