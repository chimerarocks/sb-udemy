import { reject } from 'q';
import { EventEmitter } from '@angular/core';

export class AuthService {
  loggedIn = false;

  loggedChanged = new EventEmitter<boolean>();

  login() {
    this.loggedIn = true;
    this.loggedChanged.emit(this.loggedIn);
  }

  logout() {
    this.loggedIn = false;
    this.loggedChanged.emit(this.loggedIn);
  }

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      }
    );
    return promise;
  }
}
