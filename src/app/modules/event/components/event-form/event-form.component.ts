import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Address} from 'src/app/models/address.model';
import {EventModel} from 'src/app/models/event.model';
import {AddressService} from 'src/app/services/address.service';
import {EventService} from "../../../../services/event.service";
import {Topic} from "../../../../models/topic.model";
import {TopicService} from "../../../../services/topic.service";
import {ActivatedRoute} from "@angular/router";
import {F_event} from "./event-form";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})

export class EventFormComponent implements OnInit {
  newAddress: Address | undefined;
  addressList: Address[] = [];
  topicList: Topic[] = [];
  event!: EventModel;

  eventForm = new FormGroup(F_event);

  @Output() eventEvent = new EventEmitter<EventModel>();
  @Input() address!: Address;


  constructor(private fb: FormBuilder,
              private addressService: AddressService,
              private eventService: EventService,
              private topicService: TopicService,
              private route: ActivatedRoute) {

    this.addressService.getAll().subscribe((res: Address[]) => this.addressList = res);
    this.topicService.getAll().subscribe((res) => {
      this.topicList = res;
      this.topicList.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    });

    const id = parseInt(this.route.snapshot.paramMap.get("id") || "");
    if (!isNaN(id)) {
      eventService.getOneById(id).subscribe((event) => {
        let limitedTo;
        if (event.limitedToDepartment) {
          limitedTo = "department";
        }

        if (event.limitedToTeam) {
          limitedTo = "team";
        }

        if (!event.limitedToDepartment && !event.limitedToTeam) {
          limitedTo = "all";
        }
        this.eventForm.setValue({
          name: event.name,
          address: event.address?.id,
          description: event.description,
          image: event.image,
          date: event.date,
          topic: event.topic.id,
          limitedTo: limitedTo,
        });
        this.event = event;
      });
    }
  }

  ngOnInit(): void {
  }

  public submitAddress(newAddress: any) {
    this.newAddress = newAddress as Address;
    this.addressList.push(this.newAddress);
  }

  public newAddressIsPresent() {
    return this.newAddress != undefined;
  }

  public submit() {
    const event = this.eventForm.value as EventModel;


    switch (this.eventForm.get("limitedTo")?.value) {
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

    if (this.newAddressIsPresent()) {
      event.address = this.newAddress as Address;
      event.addressId = undefined;
    } else {
      event.addressId = this.eventForm.get('address')?.value;
      event.address = undefined;
    }
    event.topic = this.topicList.find((topic) => topic.id == parseInt(this.eventForm.get('topic')?.value)) as Topic;


    if (this.eventForm.value.topic == null) {
      if (confirm("Are you sure you want to create an event without a topic? It will automatically be assigned to \"other\"")) {
        this.eventEvent.emit(event);
      }
    }
    this.eventEvent.emit(event);
  }
}
