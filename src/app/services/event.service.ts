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

   public register(event: EventModel){
     return this.server.put<EventModel>("event/register/" + event.id, event);
   }

   public unregister(event: EventModel){
    return this.server.put<EventModel>("event/unregister/" + event.id, event);
  }

  public getAllByTopic(id: number){
    return this.server.get<EventModel[]>("event/by_topic/" + id);
  }

  public getAllRegistered(){
    return this.server.get<EventModel[]>("event/registered");
  }
}
