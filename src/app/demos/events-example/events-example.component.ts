import {Component} from '@angular/core';
import {
  ArrayItemTemplateDirective,
  ArrayWrapperTemplateDirective,
  EasyForm,
  EasyFormComponent,
  EfFormArrayComponent,
  FormFieldDirective
} from "@yyasinaslan/easyform";
import {ValidatorFn} from "@angular/forms";

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

  toggleField() {
    this.dynamicPath = this.dynamicPath === 'name' ? 'fullName' : 'name';
    // Force validation
    const otherControl = this.form.getControl(this.dynamicPath == 'name' ? 'fullName' : 'name');
    otherControl.setValue(otherControl.value);
  }

  private requiredCustom = (path: string): ValidatorFn => {
    return (control) => {
      if (this.dynamicPath == path && (control.value === null || control.value === "")) {
        return {required: true};
      }
      return null;
    }
  };

  form = EasyForm.create({
    name: EasyForm.text('Name').customValidator('required', this.requiredCustom('name'), 'Name is required'),
    fullName: EasyForm.text('Full Name').customValidator('required', this.requiredCustom('fullName'), 'Fullname is required'),
    phone: EasyForm.custom('customText', 'Phone').pattern(/\d+/, 'Phone is not valid').required('Phone is required'),
  })
}
