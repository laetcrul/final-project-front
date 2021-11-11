import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/models/topic.model';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  topicList: Topic[] = [];

  constructor(private topicService: TopicService) {
    this.topicService.getAll().subscribe((topics: Topic[]) => this.topicList = topics);
   }

  ngOnInit(): void {
  }

}
