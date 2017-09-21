import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private isAuth: boolean;
  private loggedChangedSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.isAuth = this.authService.loggedIn;
    this.loggedChangedSubscription = this.authService.loggedChanged.subscribe(
      (isAuth: boolean) => {
        this.isAuth = isAuth;
      }
    );
  }

  ngOnDestroy(): void {
    this.loggedChangedSubscription.unsubscribe();
  }

  onLoadServers() {
    this.router.navigate(['/servers']);
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }
}
