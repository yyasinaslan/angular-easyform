import {Component} from '@angular/core';
import {EasyForm, EasyFormComponent, FormFieldDirective} from "@yyasinaslan/easyform";

@Component({
  selector: 'app-events-example',
  standalone: true,
  imports: [
    EasyFormComponent,
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
    name: EasyForm.text('','Name').required('Name is required'),
    email: EasyForm.text('','Email').email('Email is not valid').required('Email is required'),
    phone: EasyForm.custom('customText', 'Phone').pattern(/\d+/, 'Phone is not valid').required('Phone is required'),
  })
}
