import { Injectable } from '@angular/core';
import { Topic } from '../models/topic.model';
import { CRUD, CrudConfig } from './crud';
import { ServerService } from './server.service';

const config : CrudConfig = {path: "topic"}

@Injectable({
  providedIn: 'root'
})
export class TopicService extends CRUD<Topic>{

  constructor(protected server: ServerService) {
    super(server, config);
   }

   public getAllCreated(){
    return this.server.get<Topic[]>("topic/owned");
   }

   public getAllRegistered(){
    return this.server.get<Topic[]>("topic/registered");
   }

   public register(topic: Topic){
    return this.server.put<Topic>("topic/register/" + topic.id, topic);
  }

  public unregister(topic: Topic){
   return this.server.put<Topic>("topic/unregister/" + topic.id, topic);
 }
}
