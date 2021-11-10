import { ServerService } from "./server.service";

export abstract class CRUD<T>{
    protected server: ServerService;

    constructor(server: ServerService){
        this.server = server;
    }
}

export interface CrudConfig{
    path:string;
}