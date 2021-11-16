import { Team } from "./team.model";

export interface User{
    id: number;
    username: string;
    password: string;
    image: string;
    roles: Array<string>;
    token: string;
    team: Team;
}
