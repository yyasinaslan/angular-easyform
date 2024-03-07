import {Component} from '@angular/core';
import {
  ArrayItemTemplateDirective,
  ArrayWrapperTemplateDirective,
  EasyForm,
  EasyFormComponent,
  EfFormArrayComponent,
  FormFieldDirective
} from "easy-form";

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

  form = EasyForm.create({
    name: EasyForm.text().required('Name is required'),
  })

  handleEvent(event: Event) {
    console.log('handleEvent', event.type);
    this.eventMessage = `Event: ${event.type}`;
  }

  handleChange(value: any) {
    console.log('handleChange', value);
  }
}
