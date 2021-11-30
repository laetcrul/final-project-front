import {AbstractControl, FormControl, Validators} from "@angular/forms";

export const F_event: {[p: string]: AbstractControl} = {
  name : new FormControl(null ,[Validators.required, Validators.maxLength(50)]),
  description : new FormControl(null ,[Validators.maxLength(500)]),
  date : new FormControl(null ,[Validators.required]),
  image : new FormControl(null ,[Validators.maxLength(250)]),
  address : new FormControl(null ,[Validators.required]),
  limitedTo : new FormControl(null ,[Validators.required]),
  topic : new FormControl(null),
}
