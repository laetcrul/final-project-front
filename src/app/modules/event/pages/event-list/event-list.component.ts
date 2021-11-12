import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from 'src/app/models/event.model';
import { User } from 'src/app/models/user.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  eventList!: EventModel[];
  constructor(private eventService: EventService, private router: Router) {
    this.refresh();
   }

  ngOnInit(): void {
  }

  public refresh(){
    this.eventService.getAll().subscribe((events: EventModel[]) => this.eventList = events);
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
