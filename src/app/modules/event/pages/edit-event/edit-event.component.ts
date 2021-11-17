import { Component, OnInit } from '@angular/core';
import {EventModel} from "../../../../models/event.model";
import {EventService} from "../../../../services/event.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
  event! : EventModel;

  constructor(private eventService: EventService,
              private route: ActivatedRoute,
              private router: Router) {
    const id = parseInt(this.route.snapshot.paramMap.get("id") || "");
    eventService.getOneById(id).subscribe((event) => {
      this.event = event;
    });
  }

  ngOnInit(): void {
  }

  public submit(event : EventModel){
    this.eventService.update(this.event.id, event).subscribe(() => this.router.navigate(["event/detail/" + this.event.id]));
  }

}
