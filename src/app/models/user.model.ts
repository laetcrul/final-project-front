import { Team } from "./team.model";
import {GroupModel} from "./group.model";
import {RoleModel} from "./role.model";

export interface User{
    id: number;
    username: string;
    password: string;
    image: string;
    group: GroupModel;
    roles: Array<RoleModel>;
    token: string;
    team: Team;
}
