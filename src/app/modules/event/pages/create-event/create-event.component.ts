import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

  public submit(event: EventModel){
    this.eventService.insert(event).subscribe(() => {});
  }
}
