import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order',
  pure: false
})
export class OrderFilter implements PipeTransform {
  transform(value: any, ...args): any {
    console.log(value);
    if (value.length < 2) {
      return value;
    }
    return value.sort((a, b) => a.name > b.name);
  }
}
