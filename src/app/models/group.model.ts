import {RoleModel} from "./role.model";

export interface GroupModel{
  id: number,
  label : string,
  roles: RoleModel[];
}
