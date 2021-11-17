import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { EventModel } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import {User} from "../../../../models/user.model";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  event! : EventModel;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router) {
      const id = parseInt(this.route.snapshot.paramMap.get('id') || '', undefined);
      console.log(id);
      eventService.getOneById(id).subscribe((event: EventModel) => this.event = event);
   }

  ngOnInit(): void {

  }

  public isRegistered(event: EventModel) : boolean{
    const user: User = <User>  JSON.parse(sessionStorage.getItem('user') || "");

    return event.participants.find((found) => found.id === user.id) != undefined;
  }
  public register(event: EventModel){
    let url = this.router.url.substr(1).toString();
    console.log(url);
    this.eventService.register(event).subscribe(() => {window.location.reload();});
  }

  public unregister(event: EventModel){
    this.eventService.unregister(event).subscribe(() => {window.location.reload();});
  }

  public isOwner(event: EventModel){
    const user: User = <User>  JSON.parse(sessionStorage.getItem('user') || "");
    return user.id == event.creator.id;
  }

  public edit(event: EventModel){
    this.router.navigate(["event/edit/" + event.id]);
  }

  public delete(event: EventModel){
    confirm("Delete this topic?");
    this.eventService.delete(event.id).subscribe(() => this.router.navigate(["event/created"]));
  }
}
