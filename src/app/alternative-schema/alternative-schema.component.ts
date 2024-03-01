import {Component, signal} from '@angular/core';
import {EasyForm} from "../../lib/easy-form";
import {EasyFormComponent} from "../../lib/easy-form/easy-form.component";
import {FormFieldDirective} from "../../lib/directives/form-field.directive";
import {JsonPipe} from "@angular/common";
import {EfFormArrayComponent} from "../../lib/components/ef-form-array/ef-form-array.component";
import {FormArrayTemplateDirective} from "../../lib/directives/form-array-template.directive";
import {FormErrorsComponent} from "../../lib/components/form-errors/form-errors.component";

@Component({
  selector: 'app-alternative-schema',
  standalone: true,
  imports: [
    EasyFormComponent,
    FormFieldDirective,
    JsonPipe,
    EfFormArrayComponent,
    FormArrayTemplateDirective,
    FormErrorsComponent
  ],
  templateUrl: './alternative-schema.component.html',
  styleUrl: './alternative-schema.component.scss'
})
export class AlternativeSchemaComponent {

  nameRequiredErrorLang = signal('Name is required');

  form = new EasyForm({
    schema: {
      name: EasyForm.Text('Name').required('Name is required').minLength(3, 'Name must be at least 3 characters'),
      email: EasyForm.Email('Email').required('Email is required').email('Email is not valid'),
      skills: EasyForm.Array(EasyForm.Text().required('Skill is required'))
        .required('Skills are required')
        .minLength(3, 'At least 3 skills are required'),
      addresses: EasyForm.Array({
        title: EasyForm.Text('Title').required('Title is required'),
        street: EasyForm.Text('Street').required('Street is required'),
        city: EasyForm.Text('City').required('City is required'),
        zip: EasyForm.Number('Zip').required('Zip is required')
      }, {
        initialValue: [{title: 'Home', street: '1234 Main St', city: 'Springfield', zip: 12345}]
      }),
      notificationSettings: EasyForm.Group({
        email: EasyForm.Text('Email', {initialValue: 'yes'}),
        sms: EasyForm.Text('Sms', {initialValue: 'no'})
      })
    }
  });

  constructor() {
    console.log('form', this.form);
  }
}
