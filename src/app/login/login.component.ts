import {Component} from '@angular/core';
import {EasyForm as ef, EasyFormComponent, FormFieldDirective} from "easy-form";

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
  form = ef.create({
    email: ef.email('Email').required('Email is required').email('Email is not valid'),
    password: ef.password('Password').required('Password is required'),
    rememberMe: ef.checkbox('Remember me')
  });
}
