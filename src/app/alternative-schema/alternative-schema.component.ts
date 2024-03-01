import {Component, signal} from '@angular/core';
import {EasyForm} from "../../lib/easy-form";
import {EasyFormComponent} from "../../lib/easy-form/easy-form.component";
import {FormFieldDirective} from "../../lib/directives/form-field.directive";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-alternative-schema',
  standalone: true,
  imports: [
    EasyFormComponent,
    FormFieldDirective,
    JsonPipe
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
      skills: EasyForm.Array(EasyForm.Text('Skill').required('Skill is required')),
      addresses: EasyForm.Array({
        title: EasyForm.Text('Title').required('Title is required'),
        street: EasyForm.Text('Street').required('Street is required'),
        city: EasyForm.Text('City').required('City is required'),
        zip: EasyForm.Number('Zip').required('Zip is required')
      }),
      controlType: EasyForm.Text('Control Type').required('Control Type is required')
    }
  });

  constructor() {
    console.log('form', this.form);
  }
}
