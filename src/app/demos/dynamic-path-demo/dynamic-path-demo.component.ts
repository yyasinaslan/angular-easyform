import {Component} from '@angular/core';
import {EasyForm, EasyFormComponent, FormFieldDirective} from "@yyasinaslan/easyform";
import {ValidatorFn, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-dynamic-path-demo',
  standalone: true,
  imports: [
    EasyFormComponent,
    FormFieldDirective,
    JsonPipe
  ],
  templateUrl: './dynamic-path-demo.component.html',
  styleUrl: './dynamic-path-demo.component.scss'
})
export class DynamicPathDemoComponent {
  dynamicPath = 'name';

  toggleField() {
    this.dynamicPath = this.dynamicPath === 'name' ? 'email' : 'name';
    // Force validation
    const otherControl = this.form.getControl(this.dynamicPath == 'name' ? 'email' : 'name');
    otherControl.setValue(otherControl.value);
  }

  private requiredCustom = (path: string): ValidatorFn => {
    return (control) => {
      if (this.dynamicPath != path) return null;
      if (control.value === null || control.value === "") {
        return {required: true};
      }
      if (path == 'email') {
        const emailValidator = Validators.email;
        return emailValidator(control);
      }
      return null;
    }
  };

  form = EasyForm.create({
    name: EasyForm.text('Name').customValidator(this.requiredCustom('name'), {
      required: 'Name is required'
    }),
    email: EasyForm.email('Email')
      // Custom validator can return multiple errors, so we can set individual message for each error
      .customValidator(this.requiredCustom('email'), {
        required: 'Email is required',
        email: 'Email is not valid'
      }),
    phone: EasyForm.custom('customText', 'Phone').pattern(/\d+/, 'Phone is not valid').required('Phone is required'),
  })
}
