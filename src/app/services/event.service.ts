import { Injectable } from '@angular/core';
import { CRUD, CrudConfig } from './crud';
import { EventModel } from 'src/app/models/event.model';
import { ServerService } from './server.service';

const config : CrudConfig = {path: "event"}

@Injectable({
  providedIn: 'root'
})
export class EventService extends CRUD<EventModel>{

  constructor(protected server: ServerService) {
    super(server, config);
   }
}