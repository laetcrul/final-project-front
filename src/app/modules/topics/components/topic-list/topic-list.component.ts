import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/models/topic.model';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';
import { User } from "../../../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  topicList!: Topic[];
  filter : number = -1;
  searchText = "";


  constructor(private topicService: TopicService, private authService: AuthService, private route: ActivatedRoute, private router: Router) {

    this.route.data.subscribe((filter) => {
      this.filter = filter.filter;
    });
    this.refresh();
   }

  ngOnInit(): void {
  }

  public refresh(){

    if(this.filter != undefined){
      switch (this.filter){
        case 0: {
          this.topicService.getAllRegistered().subscribe(list => {
            this.topicList = list.sort((a, b) => this.sort(a,b));
            });
          break;
        }
        case 1:{
          this.topicService.getAllCreated().subscribe(list => this.topicList = list.sort((a,b) => this.sort(a,b)));
          break;
        }
      }
    }

    else {
      this.topicService.getAll().subscribe((list: Topic[]) => this.topicList = list.sort((a,b) => this.sort(a,b)));
    }
  }

  public isSubscribedToTopic(topic: Topic) : boolean{
    const user: User = this.authService.getCurrentUser();

    return topic.subscribedUsers.find((found) => found.id === user.id) != undefined;
  }

  public register(topic: Topic){
    this.topicService.register(topic).subscribe(() => {this.refresh();});
  }

  public unregister(topic: Topic){
    this.topicService.unregister(topic).subscribe(() => {this.refresh();});
  }

  public isOwner(topic: Topic){
    const user: User = this.authService.getCurrentUser();;
    if(user){
      return user.id == topic.creator.id;
    } else return false;
  }

  public seeDetails(topic: Topic){
    this.router.navigate(["/topic/detail/" + topic.id]);
  }

  public sort(a : Topic, b: Topic){
    if(a.name > b.name){
      return 1;
    }
    if(a.name < b.name){
      return -1;
    }
    return 0;
  }
}
