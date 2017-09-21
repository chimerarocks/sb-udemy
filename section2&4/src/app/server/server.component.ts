import { Component } from '@angular/core';

/**
 * Decorator que será analisado pelo na angular, para ele poder
 * saber o que fará com essa classe
 */
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [`
    .online {
        color: white;
    }
  `]
})
export class ServerComponent {
  serverId = 10;
  serverStatus = 'offline';
  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }
  getServerStatus() {
    return this.serverStatus;
  }
  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
}
