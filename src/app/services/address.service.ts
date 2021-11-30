import { Injectable } from "@angular/core";
import { Address } from "../models/address.model";
import { CRUD, CrudConfig } from "./crud";
import { ServerService } from "./server.service";

const config : CrudConfig = {path: "address"}

@Injectable({
  providedIn: 'root'
})
export class AddressService extends CRUD<Address>{

  constructor(protected server: ServerService) {
    super(server, config);
   }
}