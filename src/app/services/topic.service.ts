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
}