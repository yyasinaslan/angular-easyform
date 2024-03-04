import {Component, signal} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {
  EasyForm,
  EasyFormComponent,
  EfFormArrayComponent,
  FormArrayTemplateDirective,
  FormErrorsComponent,
  FormFieldDirective
} from "easy-form";

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

  inputType = signal('text');
  nameRequiredErrorLang = signal('Name is required');

  form = EasyForm.create({
    name: EasyForm.text('Name')
      .required(this.nameRequiredErrorLang)
      .minLength(3, 'Name must be at least 3 characters'),
    email: EasyForm.email('Email').required('Email is required').email('Email is not valid'),
    phone: EasyForm.number('Phone'),
    userType: EasyForm.select([
      {label: 'Admin', value: 'admin'},
      {label: 'User', value: 'user'}
    ], 'User Type').required('User Type is required'),
    skills: EasyForm.array(EasyForm.text().required('Skill is required'), {initialValue: ['programming', 'devops']})
      .required('Skills are required')
      .minLength(3, 'At least 3 skills are required'),
    addresses: EasyForm.array({
      title: EasyForm.text('Title').required('Title is required'),
      street: EasyForm.text('Street').required('Street is required'),
      city: EasyForm.text('City').required('City is required'),
      zip: EasyForm.number('Zip').required('Zip is required')
    }, {
      initialValue: [{title: 'Home', street: '1234 Main St', city: 'Springfield', zip: 12345}]
    }),
    notificationSettings: EasyForm.group({
      email: EasyForm.checkbox('Email', {initialValue: true}),
      sms: EasyForm.checkbox('Sms', {initialValue: false})
    })
  }, {
    showErrors: 'submitted'
  });
}
