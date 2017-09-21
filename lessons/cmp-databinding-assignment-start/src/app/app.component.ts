import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  countList: number[];
  oddList: number[];
  evenList: number[];
  count: number;

  ngOnInit() {
    this.countList = [];
    this.oddList = [];
    this.evenList = [];
    this.count = 0;
  }

  onCountIncreased(count: number) {
    this.countList.push(count);
    this.count = count;
  }
  onGameStopped() {
    const self = this;
    self.countList.forEach((v) => {
      if (v % 2 === 0) {
        self.oddList.push(v);
      } else {
        self.evenList.push(v);
      }
    });
  }

  onGameStarted() {
    this.cleanLists();
  }
  cleanLists() {
    this.oddList = [];
    this.evenList = [];
  }
}
