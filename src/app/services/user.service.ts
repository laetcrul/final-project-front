import {Injectable} from "@angular/core";
import {CRUD, CrudConfig} from "./crud";
import {ServerService} from "./server.service";
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const config : CrudConfig = {path: "user"}
const SERVER_URL: string = environment.api.url;

@Injectable({
  providedIn: 'root'
})
export class UserService extends CRUD<User>{

  constructor(protected server: ServerService,
              private http: HttpClient) {
    super(server, config);
  }

  public addRole(roleId: number, userId: number){
    return this.http.put<User>(`${SERVER_URL}user/add_role?userId=${userId}&roleId=${roleId}`, "");
  }

  public removeRole(roleId: number, userId: number){
    return this.http.put<User>(`${SERVER_URL}user/remove_role?userId=${userId}&roleId=${roleId}`, "");
  }
}
