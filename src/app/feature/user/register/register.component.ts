import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, Selectors } from 'src/app/store';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = this.fb.group({
    firstName: ['', { validators: Validators.required }],
    lastName: ['', { validators: Validators.required }],
    userName: ['', { validators: Validators.required }],
    password: ['', { validators: Validators.required }],
  });

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {}

  submit() {
    const data = this.form.valid ? this.form.value : null;
    this.store.dispatch(Actions.user.register({ payload: data }));
  }
}
