import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-reactive-driven-app',
  templateUrl: './reactive-driven-app.component.html',
  styleUrls: ['./reactive-driven-app.component.css']
})
export class ReactiveDrivenAppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsenames = ['Chris', 'Anna'];

  constructor() { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    this.signupForm.valueChanges.subscribe(
      (value) => {
        console.log(value);
      }
    );

    this.signupForm.statusChanges.subscribe(
      (status) => {
        console.log(status);
      }
    );

    this.signupForm.setValue({
      'userData': {
        'username': '',
        'email': ''
      },
      'gender': 'male',
      'hobbies': []
    });

    this.signupForm.patchValue({
      'gender': 'male'
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsenames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null; // <<<--- não retorne nada caso o teste falhe
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          return null;
        }
      }, 2000);
    });
    return promise;
  }
}
