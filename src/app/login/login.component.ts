import { Component } from '@angular/core';
import {EasyForm, EasyFormComponent, FormFieldDirective} from "easy-form";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    EasyFormComponent,
    FormFieldDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form = EasyForm.create({
    email: EasyForm.email('Email').required('Email is required').email('Email is not valid'),
    password: EasyForm.password('Password').required('Password is required'),
  });
}
