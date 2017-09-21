import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges {
  @Input() element: {name: string, type: string, content: string};

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnInit() {
  }

}
