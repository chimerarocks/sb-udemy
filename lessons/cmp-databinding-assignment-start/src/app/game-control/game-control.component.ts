import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Timer = NodeJS.Timer;

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() countIncreased = new EventEmitter<number>();
  @Output() gameStopped = new EventEmitter();
  @Output() gameStarted = new EventEmitter();
  count: number;
  intervalId: Timer;

  constructor() {
    this.count = 0;
  }

  ngOnInit() {
  }

  startGame() {
    const self = this;
    self.count = 0;
    self.intervalId = setInterval(() => {
      self.count++;
      self.countIncreased.emit(this.count);
    }, 200);
    this.gameStarted.emit();
  }

  stopGame() {
    clearInterval(this.intervalId);
    this.gameStopped.emit();
  }

}
