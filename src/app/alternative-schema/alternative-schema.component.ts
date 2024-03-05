import {Component, signal} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {
  EasyForm as ef,
  EasyFormComponent,
  EfFormArrayComponent,
  FormArrayTemplateDirective,
  FormErrorsComponent,
  FormFieldDirective
} from "easy-form";
import {FormGroup} from "@angular/forms";

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

  form = ef.create({
    name: ef.text('Name')
      .required(this.nameRequiredErrorLang)
      .minLength(3, 'Name must be at least 3 characters'),
    email: ef.email('Email').required('Email is required').email('Email is not valid'),
    phone: ef.number('Phone'),
    userType: ef.select([
      {label: 'Admin', value: 'admin'},
      {label: 'User', value: 'user'}
    ], 'User Type').required('User Type is required'),
    publishDate: ef.date<string, Date>('Publish Date').required('Publish Date is required'),
    skills: ef.array(ef.text().required('Skill is required'), {initialValue: ['programming', 'devops']})
      .required('Skills are required')
      .minLength(3, 'At least 3 skills are required'),
    addresses: ef.array({
      title: ef.text('Title').required('Title is required'),
      street: ef.text('Street').required('Street is required'),
      city: ef.text('City').required('City is required'),
      zip: ef.number('Zip').required('Zip is required')
    }).default([{title: 'Home', street: '1234 Main St', city: 'Springfield', zip: 12345}]),
    notificationSettings: ef.group({
      email: ef.checkbox('Email').default(true),
      sms: ef.checkbox('Sms').default(false)
    })
  }, {
    showErrors: 'submitted'
  });

  submitted(event: FormGroup) {
    console.log('submitted', event.value);
  }
}
