import {Component} from '@angular/core';
import {
  ArrayItemTemplateDirective,
  ArrayWrapperTemplateDirective,
  EasyForm,
  EasyFormComponent,
  EfFormArrayComponent,
  FormFieldDirective
} from "@yyasinaslan/easyform";
import {ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-events-example',
  standalone: true,
  imports: [
    ArrayItemTemplateDirective,
    ArrayWrapperTemplateDirective,
    EasyFormComponent,
    EfFormArrayComponent,
    FormFieldDirective
  ],
  templateUrl: './events-example.component.html',
  styleUrl: './events-example.component.scss'
})
export class EventsExampleComponent {
  eventMessage = '';

  dynamicPath = 'name';

  handleEvent(event: Event) {
    console.log('handleEvent', event.type);
    this.eventMessage = `Event: ${event.type}`;
  }

  handleChange(value: any) {
    console.log('handleChange', value);
  }


  form = EasyForm.create({
    name: EasyForm.text('Name').required('Name is required'),
    email: EasyForm.email('Email').email('Email is not valid').required('Email is required'),
    phone: EasyForm.custom('customText', 'Phone').pattern(/\d+/, 'Phone is not valid').required('Phone is required'),
  })
}
