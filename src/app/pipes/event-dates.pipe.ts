import {Pipe, PipeTransform} from '@angular/core';
import {EventModel} from "../models/event.model";
import {TimeEnum} from "../enums/time.enum";

@Pipe({
  name: 'eventDates'
})
export class EventDatesPipe implements PipeTransform {

  transform(items: EventModel[], filter: number): any[] {
    if (!items) {
      return [];
    }

    if(!filter){
      console.log("no filter");
      return items;
    }


    if(filter == TimeEnum.PAST){
      console.log("past");
      return items.filter(it =>
        this.isPast(it));
    }

    if(filter == TimeEnum.FUTURE){
      console.log("future");
      return items.filter(it =>
        !this.isPast(it));
    }

    else{
      console.log("else");
      return [];
    }
  }

  private isPast(event: EventModel){
    let eventDate = new Date(event.date);
    let timeRemaining = eventDate.valueOf() - Date.now().valueOf();
    console.log(event.name, timeRemaining);
    console.log(timeRemaining < 0);
    return timeRemaining < 0;
  }
}
