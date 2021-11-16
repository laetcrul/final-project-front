import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/models/topic.model';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';
import { User } from "../../../../models/user.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  topicList!: Topic[];
  filter : number = -1;


  constructor(private topicService: TopicService, private authService: AuthService, private route: ActivatedRoute) {

    this.route.data.subscribe((filter) => {
      this.filter = filter.filter;
    });
    this.refresh();
   }

  ngOnInit(): void {
  }

  public refresh(){
    console.log("filter = " + this.filter);

    if(this.filter != undefined){
      console.log("entered switch");
      switch (this.filter){
        case 0: {
          this.topicService.getAllRegistered().subscribe(list => this.topicList = list);
          break;
        }
        case 1:{
          this.topicService.getAllCreated().subscribe(list => this.topicList = list);
          break;
        }
      }
    }

    else {
      console.log("bp 1");
      this.topicService.getAll().subscribe((topics: Topic[]) => this.topicList = topics);
    }
  }

  public isSubscribedToTopic(topic: Topic) : boolean{
    console.log("bp 2");
    const user: User = <User>  JSON.parse(sessionStorage.getItem('user') || "");

    return topic.subscribedUsers.find((found) => found.id === user.id) != undefined;
  }

  public register(topic: Topic){
    console.log("bp 3");
    this.topicService.register(topic).subscribe(() => {this.refresh();});
  }

  public unregister(topic: Topic){
    this.topicService.unregister(topic).subscribe(() => {this.refresh();});
  }
}
