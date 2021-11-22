import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TopicService} from "../../../../services/topic.service";
import {Topic} from "../../../../models/topic.model";
import {User} from "../../../../models/user.model";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss']
})
export class TopicDetailsComponent implements OnInit {
  topic!: Topic;

  constructor(private route: ActivatedRoute,
              private topicService: TopicService,
              private router: Router,
              private authService: AuthService) {
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
    this.topicService.register(topic).subscribe(() => {window.location.reload();});
  }

  public unregister(topic: Topic){
    this.topicService.unregister(topic).subscribe(() => {window.location.reload();});
  }

  public edit(topic: Topic){
    this.router.navigate(["topic/edit/" + topic.id]);
  }

  public isOwner(topic: Topic){
    const user: User = <User>  JSON.parse(sessionStorage.getItem('user') || "");
    return user.id == topic.creator.id;
  }
  public delete(topic: Topic){
    if(!this.isOwner(topic) && this.isAdmin()){
      if(confirm("Are you sure you want to delete " + topic.creator.username + "'s topic?")){
        this.topicService.delete(topic.id).subscribe(() => this.router.navigate(["topic/all"]));
      } return;
    }
    if(confirm("Delete this topic?")){
      this.topicService.delete(topic.id).subscribe(() => this.router.navigate(["topic/created"]));
    }
  }
  public isAdmin(){
    return this.authService.isAdmin();
  }
}
