import { Injectable } from '@angular/core';

@Injectable()
export class CounterService {

  activeToInactiveCounter = 0;
  inactiveToActiveCounter = 0;

  constructor() { }

  incActiveToInactiveCounter() {
    this.activeToInactiveCounter++;
    console.log('added', this.activeToInactiveCounter);
  }

  incInctiveToActiveCounter() {
    this.inactiveToActiveCounter++;
    console.log('added', this.inactiveToActiveCounter);
  }
}
