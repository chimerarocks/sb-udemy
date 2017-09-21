import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges, DoCheck {
  activeToInactiveCounter = 0;
  inactiveToActiveCounter = 0;

  constructor(private counterService: CounterService) {}

  ngOnInit() {
    this.activeToInactiveCounter = this.counterService.activeToInactiveCounter;
    this.inactiveToActiveCounter = this.counterService.inactiveToActiveCounter;
  }

  ngOnChanges() {
    console.log('here');
  }

  ngDoCheck() {
    this.activeToInactiveCounter = this.counterService.activeToInactiveCounter;
    this.inactiveToActiveCounter = this.counterService.inactiveToActiveCounter;
  }
}
