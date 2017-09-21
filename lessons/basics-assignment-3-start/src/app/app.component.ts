import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`
      .highlighted {
          color: white;
      }
  `]
})
export class AppComponent {
  isDisplayDetails = false;
  logs = [{toggle: false, timestamp: Date.now()}];
  toggleDisplayDetails() {
    this.isDisplayDetails = !this.isDisplayDetails;
    this.logs.push({toggle:  this.isDisplayDetails, timestamp: Date.now()});
  }
}
