import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  eventList!: EventModel[];
  constructor(private eventService: EventService) {
    this.eventService.getAll().subscribe((events: EventModel[]) => this.eventList = events);
   }

  ngOnInit(): void {
  }

}
