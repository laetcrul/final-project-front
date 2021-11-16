import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  addressForm: FormGroup;
  numberCtl: FormControl;
  streetCtl: FormControl;
  cityCtl: FormControl;
  postcodeCtl: FormControl;
  countryCtl: FormControl;


  @Output() addressEvent = new EventEmitter<Address>();

  constructor(private fb: FormBuilder) {
    this.numberCtl = fb.control(null, [Validators.required, Validators.maxLength(5)]);
    this.streetCtl = fb.control(null, [Validators.required, Validators.maxLength(30)]);
    this.cityCtl = fb.control(null, [Validators.required, Validators.maxLength(30)]);
    this.postcodeCtl = fb.control(null, [Validators.required, Validators.maxLength(8)]);
    this.countryCtl = fb.control(null, [Validators.required, Validators.maxLength(30)]);

    this.addressForm = fb.group({
      number : this.numberCtl,
      street: this.streetCtl,
      postcode: this.postcodeCtl,
      city: this.cityCtl,
      country: this.countryCtl
    });
  }

  ngOnInit(): void {
  }

  public submit(){
    if(this.addressForm.valid){
      this.addressEvent.emit(this.addressForm.value as Address);
    }
  }
}
