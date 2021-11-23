import {AbstractControl, FormControl, Validators} from "@angular/forms";

export const F_topic: {[p: string]: AbstractControl} = {
  name : new FormControl(null ,[Validators.required, Validators.maxLength(50)]),
  description : new FormControl(null ,[Validators.maxLength(500)]),
  image : new FormControl(null ,[Validators.maxLength(250)])
}
