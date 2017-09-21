import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private form: FormGroup;
  private projectStatus = [
    'Stable',
    'Critical',
    'Finished'
  ];
  private forbiddenNames = [
    'Test'
  ];

  ngOnInit(): void {
    this.form = new FormGroup({
      'project': new FormControl(null, [Validators.required, this.forbiddenProjectNames.bind(this)]),
      'mail': new FormControl(null),
      'status': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.form);
  }

  forbiddenProjectNames(control: FormControl): {[s: string]: boolean} {
    const i = this.forbiddenNames.indexOf(control.value);
    if (i !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }
}
