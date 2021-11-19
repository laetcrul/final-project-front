import { Pipe, PipeTransform } from '@angular/core';
import {EventModel} from "../models/event.model";

@Pipe({
  name: 'appFilter'
})
export class FilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();


    return items.filter(it => {
      if(it.username){
        return it.username.toLowerCase().includes(searchText);
      }

      if(it.name){
        return it.name.toLowerCase().includes(searchText);
      }
    });
  }
}

