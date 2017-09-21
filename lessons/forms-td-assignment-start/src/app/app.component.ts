import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') form: NgForm;
    user = {
    email: '',
    subscription: '',
    password: ''
  };

  onSubmit() {
    this.user.email = this.form.value.email;
    this.user.subscription = this.form.value.subscription;
    this.user.password = this.form.value.password;
  }
}
