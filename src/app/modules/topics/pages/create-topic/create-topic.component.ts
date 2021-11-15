import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Topic } from 'src/app/models/topic.model';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {

  constructor(private topicService: TopicService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(topic: Topic){
    this.topicService.insert(topic).subscribe(() => {});
    this.router.navigate(["topic/list"]);
  }
}
