import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address.model';
import { EventModel } from 'src/app/models/event.model';
import { AddressService } from 'src/app/services/address.service';
import {EventService} from "../../../../services/event.service";
import {Topic} from "../../../../models/topic.model";
import {TopicService} from "../../../../services/topic.service";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})

export class EventFormComponent implements OnInit {
  newAddress: Address | undefined;
  addressList: Address[] = [];
  topicList: Topic[] = [];

  eventForm: FormGroup;
  nameCtl: FormControl;
  descriptionCtl: FormControl;
  dateCtl: FormControl;
  imageCtl: FormControl;
  addressCtl: FormControl;
  limitedToCtl: FormControl;
  topicCtl: FormControl;

  @Output() eventEvent = new EventEmitter<EventModel>();
  @Input() address! : Address;


  constructor(private fb: FormBuilder,
              private addressService: AddressService,
              private eventService: EventService,
              private topicService: TopicService) {
    this.addressService.getAll().subscribe((res : Address[]) => this.addressList = res);
    this.topicService.getAll().subscribe((res) => {
      this.topicList = res;
      this.topicList.sort(function (a,b){
        if(a.name > b.name){
          return 1;
        }
        if(a.name < b.name){
          return -1;
        } return 0;
      });
    });

    this.nameCtl = fb.control(null, [Validators.required, Validators.maxLength(50)]),
    this.descriptionCtl = fb.control(null,  Validators.maxLength(500));
    this.dateCtl = fb.control(null, Validators.required);
    this.imageCtl = fb.control(null, Validators.maxLength(200));
    this.addressCtl = fb.control(null);
    this.limitedToCtl = fb. control(null, Validators.required);
    this.topicCtl = fb.control(null)

    this.eventForm = fb.group({
      name: this.nameCtl,
      description: this.descriptionCtl,
      date: this.dateCtl,
      image: this.imageCtl,
      address: this.addressCtl,
      limitedTo: this.limitedToCtl,
      topic: this.topicCtl,
    });
   }

  ngOnInit(): void {
  }

  public submitAddress(newAddress : any){
    this.newAddress = newAddress as Address;
    console.log(this.newAddress);
    this.addressList.push(this.newAddress);
  }

  public newAddressIsPresent(){
    return this.newAddress != undefined;
  }

  public submit(){
    const event = this.eventForm.value as EventModel;

    switch (this.limitedToCtl.value){
      case "team":
        event.limitedToTeam = true;
        event.limitedToDepartment = false;
        break;
      case "department":
        event.limitedToDepartment = true;
        event.limitedToTeam = false;
        break;
      case "all":
        event.limitedToTeam = false;
        event.limitedToDepartment = false;
        break;
    }

    event.topic = this.topicList.find((topic) => topic.id == parseInt(this.topicCtl.value)) as Topic;

    if(this.newAddressIsPresent()){
      event.address = this.newAddress as Address;
      event.addressId = undefined;
    }
    else{
      event.addressId = parseInt(this.addressCtl.value);
      event.address = undefined;
    }

    this.eventService.insert(event).subscribe(() => {
      alert("Event was successfully created");
    });
  }
}
