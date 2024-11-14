import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {EasyForm, EasyFormComponent, FormFieldDirective} from "@yyasinaslan/easyform";

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
    email: EasyForm.text('','Email', {props: {type: 'email'}}).required('Email is required').email('Email is not valid'),
    password: EasyForm.text('','Password', {props: {type: 'password'}}).required('Password is required'),
    rememberMe: EasyForm.checkbox('Remember me')
  });

  handleSubmit(event: FormGroup) {
    if (this.form.invalid) {
      console.log('Form is invalid')
    } else {
      console.log('Form is valid')
    }
  }
}
