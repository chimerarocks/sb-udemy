import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReverseFilter implements PipeTransform {
  transform(value: any, ...args): any {
    return value.split('').reverse().join('');
  }
}
