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
      return items;
    }


    if(filter == TimeEnum.PAST){
      return items.filter(it =>
        this.isPast(it));
    }

    if(filter == TimeEnum.FUTURE){
      return items.filter(it =>
        !this.isPast(it));
    }

    else{
      return [];
    }
  }

  private isPast(event: EventModel){
    let eventDate = new Date(event.date);
    let timeRemaining = eventDate.valueOf() - Date.now().valueOf();
    return timeRemaining < 0;
  }
}
