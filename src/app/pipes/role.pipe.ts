import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleTransform'
})
export class RolePipe implements PipeTransform {
  transform(label: string): string {
    let string = label.toLowerCase().split("_").join(" ").replace("role ", "");
    return  string[0].toUpperCase() + string.slice(1);
  }
}
