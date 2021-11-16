import { ServerService } from "./server.service";

export abstract class CRUD<T>{
    protected server: ServerService;
    protected config: CrudConfig;

    constructor(server: ServerService,
        config: CrudConfig){
        this.server = server;
        this.config = config;
    }

    public getAll(){
        return this.server.get<T[]>(this.config.path);
    }

    public getOneById(id: number){
        return this.server.get<T>(this.config.path + `/${id}`);
    }

    public insert(body: T){
        return this.server.post(this.config.path, body);
    }

    public update(id: number, body: T){
        return this.server.put(this.config.path + `/${id}`, body);
    }

    public delete(id: number){
        return this.server.delete(this.config.path + `/${id}`);
    }
}

export interface CrudConfig{
    path:string;
}
