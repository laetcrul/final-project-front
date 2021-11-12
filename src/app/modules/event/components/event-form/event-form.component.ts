import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address.model';
import { EventModel } from 'src/app/models/event.model';
import { CreateAddressComponent } from '../../pages/create-address/create-address.component';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  newAddress: Address;

  eventForm: FormGroup;
  nameCtl: FormControl;
  descriptionCtl: FormControl;
  dateCtl: FormControl;
  imageCtl: FormControl;
  addressCtl: FormControl;
  limitedToTeamCtl: FormControl;
  limitedToDepartmentCtl: FormControl;

  @Output() eventEvent = new EventEmitter<EventModel>();


  constructor(private fb: FormBuilder) {
    this.newAddress = {id: 0, street: "", city: "", postcode: 0, number: 0, country: ""};

    this.nameCtl = fb.control(null, [Validators.required, Validators.maxLength(50)]),
    this.descriptionCtl = fb.control(null,  Validators.maxLength(500));
    this.dateCtl = fb.control(null, Validators.required);
    this.imageCtl = fb.control(null, Validators.maxLength(200));
    this.addressCtl = fb.control(null, Validators.required);
    this.limitedToDepartmentCtl = fb. control(null, Validators.required);
    this.limitedToTeamCtl = fb. control(null, Validators.required);

    this.eventForm = fb.group({
      name: this.nameCtl,
      description: this.descriptionCtl,
      date: this.dateCtl,
      image: this.imageCtl,
      address: this.imageCtl,
      limitedToDepartment: this.limitedToDepartmentCtl,
      limitedToTeam: this.limitedToTeamCtl
    });
   }

  ngOnInit(): void {
  }

  public submit(){
    if(this.eventForm.valid){
      const event = this.eventForm.value as EventModel;
      this.eventEvent.emit(event);
    }
  }
}
