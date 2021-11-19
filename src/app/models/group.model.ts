import {RoleModel} from "./role.model";

export interface GroupModel{
  label : string,
  roles: RoleModel[];
}
