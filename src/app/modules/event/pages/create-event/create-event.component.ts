import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
  }

  public submit(event: any){
    this.eventService.insert(event).subscribe(() => {this.router.navigate(["event/created"]);});
  }
}
