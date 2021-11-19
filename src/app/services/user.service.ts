import {Injectable} from "@angular/core";
import {CRUD, CrudConfig} from "./crud";
import {ServerService} from "./server.service";
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";

const config : CrudConfig = {path: "user"}

@Injectable({
  providedIn: 'root'
})
export class UserService extends CRUD<User>{

  constructor(protected server: ServerService,
              private http: HttpClient) {
    super(server, config);
  }

  public addRole(roleId: number, userId: number){
    return this.http.put<User>("user/add_role?userId=" + userId + "&roleId=" + roleId, "");
  }
}
