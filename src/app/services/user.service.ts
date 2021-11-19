import {Injectable} from "@angular/core";
import {CRUD, CrudConfig} from "./crud";
import {ServerService} from "./server.service";
import {User} from "../models/user.model";

const config : CrudConfig = {path: "user"}

@Injectable({
  providedIn: 'root'
})
export class UserService extends CRUD<User>{

  constructor(protected server: ServerService) {
    super(server, config);
  }
}
