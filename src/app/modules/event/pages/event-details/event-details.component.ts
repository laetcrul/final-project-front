import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventModel } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  event! : EventModel;
  constructor(
    private route: ActivatedRoute, 
    private eventService: EventService) {
      const id = parseInt(this.route.snapshot.paramMap.get('id') || '', undefined);
      console.log(id);
      eventService.getOneById(id).subscribe((event: EventModel) => this.event = event);
   }

  ngOnInit(): void {
  
  }

}
