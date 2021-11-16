import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EventModel} from "../../../../models/event.model";
import {EventService} from "../../../../services/event.service";

@Component({
  selector: 'app-subscribed-events',
  templateUrl: './subscribed-events.component.html',
  styleUrls: ['./subscribed-events.component.scss']
})
export class SubscribedEventsComponent implements OnInit {
  eventList: EventModel[] = [];

  @Output("emit") list = new EventEmitter<any>();

  constructor(private eventService: EventService) {
    this.eventService.getAllRegistered().subscribe((list) => {this.eventList = list; console.log(this.eventList);});
  }

  ngOnInit(): void {
  }

  public output(){
    this.list.emit(this.eventList);
  }

}
