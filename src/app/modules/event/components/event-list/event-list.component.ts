import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { EventModel } from 'src/app/models/event.model';
import { User } from 'src/app/models/user.model';
import { EventService } from 'src/app/services/event.service';
import {Topic} from "../../../../models/topic.model";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  eventList!: EventModel[];

  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute) {
    this.refresh();
   }

  ngOnInit(): void {
  }

  public refresh(){

    const topicId = parseInt(this.route.snapshot.paramMap.get('id') || "");
    console.log("filter = " + topicId);

    if(topicId){
      this.eventService.getAllByTopic(topicId).subscribe((res) => this.eventList = res);
    }
    else{
      this.eventService.getAll().subscribe((events: EventModel[]) => this.eventList = events);
    }

  }

  public isRegistered(event: EventModel) : boolean{
    const user: User = <User>  JSON.parse(sessionStorage.getItem('user') || "");

    return event.participants.find((found) => found.id === user.id) != undefined;
  }

  public register(event: EventModel){
    this.eventService.register(event).subscribe(() => {this.refresh();});
  }

  public unregister(event: EventModel){
    this.eventService.unregister(event).subscribe(() => {this.refresh();});
  }
}
