import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address.model';
import { EventModel } from 'src/app/models/event.model';
import { AddressService } from 'src/app/services/address.service';
import {EventService} from "../../../../services/event.service";
import {Topic} from "../../../../models/topic.model";
import {TopicService} from "../../../../services/topic.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})

export class EventFormComponent implements OnInit {
  newAddress: Address | undefined;
  addressList: Address[] = [];
  topicList: Topic[] = [];
  event! : EventModel;

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
              private topicService: TopicService,
              private route: ActivatedRoute) {
    const id = parseInt(this.route.snapshot.paramMap.get("id") || "");
    if (!isNaN(id)){
      eventService.getOneById(id).subscribe((event) => {
        this.event = event;
      });
    }

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

    this.nameCtl = fb.control([this.event?.name], [Validators.required, Validators.maxLength(50)]);
    this.descriptionCtl = fb.control([this.event?.description],  Validators.maxLength(500));
    this.dateCtl = fb.control([this.event?.date], Validators.required);
    this.imageCtl = fb.control([this.event?.image], Validators.maxLength(200));
    this.addressCtl = fb.control(this.event?.address);
    this.limitedToCtl = fb. control(null, Validators.required);
    this.topicCtl = fb.control([this.event?.topic])

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
    this.addressList.push(this.newAddress);
  }

  public newAddressIsPresent(){
    return this.newAddress != undefined;
  }

  public submit(){
    const event = this.eventForm.value as EventModel;

    if(this.limitedToCtl.dirty){
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
    } else{
      event.address = this.event.address;
    }

    if(this.addressCtl.dirty){
      if(this.newAddressIsPresent()){
        event.address = this.newAddress as Address;
        event.addressId = undefined;
      }
      else{
        event.addressId = parseInt(this.addressCtl.value);
        event.address = undefined;
      }
    } else {
      event.address = this.event.address;
    }

    if(this.topicCtl.dirty){
      event.topic = this.topicList.find((topic) => topic.id == parseInt(this.topicCtl.value)) as Topic;
    } else{
      event.topic = this.event.topic;
    }

    if(!this.nameCtl.dirty){
      event.name = this.event.name;
    }

    if(!this.descriptionCtl.dirty){
      event.description = this.event.description;
    }

    if(!this.dateCtl.dirty){
      event.date = this.event.date;
    }

    if(!this.imageCtl.dirty){
      event.image = this.event.image;
    }
    this.eventEvent.emit(event);
  }
}
