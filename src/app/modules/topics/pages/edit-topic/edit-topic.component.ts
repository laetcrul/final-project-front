import { Component, OnInit } from '@angular/core';
import {TopicService} from "../../../../services/topic.service";
import {ActivatedRoute} from "@angular/router";
import {Topic} from "../../../../models/topic.model";

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.scss']
})
export class EditTopicComponent implements OnInit {
  topic! : Topic;

  constructor(private topicService: TopicService, private route: ActivatedRoute) {
    const id = parseInt(this.route.snapshot.paramMap.get("id") || "");
    topicService.getOneById(id).subscribe((topic) => {
      this.topic = topic;
    });
  }

  ngOnInit(): void {
  }

  public submit(topic: any){
    this.topicService.update(this.topic.id, topic).subscribe(() => console.log("updated"));
  }
}
