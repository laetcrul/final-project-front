import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/models/topic.model';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';
import { User } from "../../../../models/user.model";

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  topicList: Topic[] = [];

  constructor(private topicService: TopicService, private authService: AuthService) {
    this.refresh();
   }

  ngOnInit(): void {
  }

  public refresh(){
    this.topicService.getAll().subscribe((topics: Topic[]) => this.topicList = topics);
  }

  public isSubscribedToTopic(topic: Topic) : boolean{
    const user: User = <User>  JSON.parse(sessionStorage.getItem('user') || "");

    return topic.subscribedUsers.find((found) => found.id === user.id) != undefined;
  }

  public register(topic: Topic){
    this.topicService.register(topic).subscribe(() => {this.refresh();});
  }

  public unregister(topic: Topic){
    this.topicService.unregister(topic).subscribe(() => {this.refresh();});
  }
}
