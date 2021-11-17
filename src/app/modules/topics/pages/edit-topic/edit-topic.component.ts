import { Component, OnInit } from '@angular/core';
import {TopicService} from "../../../../services/topic.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Topic} from "../../../../models/topic.model";

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.scss']
})
export class EditTopicComponent implements OnInit {
  topic! : Topic;

  constructor(private topicService: TopicService,
              private route: ActivatedRoute,
              private router: Router ) {
    const id = parseInt(this.route.snapshot.paramMap.get("id") || "");
    topicService.getOneById(id).subscribe((topic) => {
      this.topic = topic;
    });
  }

  ngOnInit(): void {
  }

  public submit(topic: Topic){
    this.topicService.update(this.topic.id, topic).subscribe(() => this.router.navigate(["topic/detail/" + this.topic.id]));
  }
}
