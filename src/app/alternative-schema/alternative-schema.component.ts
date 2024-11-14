import {Component, signal} from '@angular/core';
import {
  ArrayItemTemplateDirective,
  EasyForm as ef,
  EasyFormComponent,
  EfErrorsComponent,
  EfFormArrayComponent,
  FormFieldDirective
} from "@yyasinaslan/easyform";
import {FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-alternative-schema',
  standalone: true,
  imports: [
    EasyFormComponent,
    FormFieldDirective,
    EfFormArrayComponent,
    ArrayItemTemplateDirective,
    EfErrorsComponent
  ],
  templateUrl: './alternative-schema.component.html',
  styleUrl: './alternative-schema.component.scss'
})
export class AlternativeSchemaComponent {

  inputType = signal('text');
  nameRequiredErrorLang = new BehaviorSubject('Name is required');

  form = ef.create({
    name: ef.text('', 'Name')
      .required(this.nameRequiredErrorLang)
      .minLength(3, 'Name must be at least 3 characters'),
    email: ef.text('', 'Email').required('Email is required').email('Email is not valid'),
    phone: ef.text('', 'Phone'),
    userType: ef.select('admin', [
      {label: 'Admin', value: 'admin'},
      {label: 'User', value: 'user'}
    ], 'User Type'),
    adminRoles: ef.radio(null,
      [{label: 'Super Admin', value: 'super'}, {
        label: 'Admin',
        value: 'admin'
      }], 'Admin Roles'),
    publishDate: ef.text<string>('Publish Date'),
    gender: ef.radio('male', [
      {label: 'Male', value: 'male'},
      {label: 'Female', value: 'female'},
      {label: 'Dont want to provide', value: 'unprovided'},
    ], 'Gender'),
    skills: ef.array(ef.text('', '').required('Skill is required'), {initialValue: ['programming', 'devops']})
      .required('Skills are required')
      .minLength(3, 'At least 3 skills are required'),
    addresses: ef.array({
      title: ef.text('', 'Title').required('Title is required'),
      street: ef.text('', 'Street').required('Street is required'),
      city: ef.text('', 'City').required('City is required'),
      zip: ef.text('', 'Zip').required('Zip is required')
    }).default([{title: 'Home', street: '1234 Main St', city: 'Springfield', zip: '12345'}]),
    notificationSettings: ef.group({
      email: ef.checkbox(false, 'Email'),
      sms: ef.checkbox(false, 'Sms')
    }),
    permissionsSettings: ef.group({
      acceptTermsOfService: ef.switch(true, 'Accept Terms of Service'),
      enableWifi: ef.switch(false, 'Enable Wifi')
    }),
    description: ef.textarea('Description')
      .maxLength(500, 'Description must be no more than 500 characters'),
  }, {
    showErrors: 'submitted'
  });

  submitted(event: FormGroup) {
    console.log('submitted', event.value);
    if (this.form.invalid) return;

    const data = this.form.getValue();
  }

  handleChange(event: Event) {
    console.log('change', event);
  }

  handleFocus($event: Event) {
    console.log('focus', $event);
  }
}
