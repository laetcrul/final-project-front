import {Injectable} from "@angular/core";
import {CRUD, CrudConfig} from "./crud";
import {RoleModel} from "../models/role.model";
import {ServerService} from "./server.service";
import {EventModel} from "../models/event.model";

const config : CrudConfig = {path: "role"}

@Injectable({
  providedIn: 'root'
})
export class RoleService extends CRUD<RoleModel>{

  constructor(protected server: ServerService) {
    super(server, config);
  }

  public findAllAdmin(){
    return this.server.get<RoleModel[]>("role/admin");
  }
}
