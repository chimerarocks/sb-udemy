import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-app',
  templateUrl: './template-driven-app.component.html',
  styleUrls: ['./template-driven-app.component.css']
})
export class TemplateDrivenAppComponent {

  @ViewChild('f') singupForm: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.singupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: 'pet',
    //   gender: 'male'
    // });

    this.singupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  // onSubmit() {
  //   console.log(this.singupForm);
  // }

  onSubmit() {
    this.user.username = this.singupForm.value.userData.username;
    this.user.email = this.singupForm.value.userData.email;
    this.user.secretQuestion = this.singupForm.value.secret;
    this.user.answer = this.singupForm.value.questionAnswer;
    this.user.gender = this.singupForm.value.gender;
    this.submitted = true;

    this.singupForm.reset();
  }

}
