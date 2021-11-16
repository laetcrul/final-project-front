import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TopicService} from "../../../../services/topic.service";
import {Topic} from "../../../../models/topic.model";
import {User} from "../../../../models/user.model";

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss']
})
export class TopicDetailsComponent implements OnInit {
  topic!: Topic;

  constructor(private route: ActivatedRoute, private topicService: TopicService) {
    const id = parseInt(this.route.snapshot.paramMap.get("id") || "");
    topicService.getOneById(id).subscribe((topic) => this.topic = topic);
  }

  ngOnInit(): void {
  }

  public isSubscribedToTopic(topic: Topic) : boolean{
    const user: User = <User>  JSON.parse(sessionStorage.getItem('user') || "");

    return topic.subscribedUsers.find((found) => found.id === user.id) != undefined;
  }

  public register(topic: Topic){
    this.topicService.register(topic).subscribe(() => {this.ngOnInit();});
  }

  public unregister(topic: Topic){
    this.topicService.unregister(topic).subscribe(() => {this.ngOnInit();});
  }
}
