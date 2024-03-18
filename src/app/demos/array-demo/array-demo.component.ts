import {Component} from '@angular/core';
import {
  ArrayItemTemplateDirective,
  EasyForm,
  EasyFormComponent,
  EfErrorsComponent,
  EfFormArrayComponent,
  FormFieldDirective
} from "@yyasinaslan/easyform";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-array-demo',
  standalone: true,
  imports: [
    EasyFormComponent,
    FormFieldDirective,
    EfFormArrayComponent,
    ArrayItemTemplateDirective,
    EfErrorsComponent,
    JsonPipe
  ],
  templateUrl: './array-demo.component.html',
  styleUrl: './array-demo.component.scss'
})
export class ArrayDemoComponent {
  form = EasyForm.create({
    customerName: EasyForm.text('Customer Name').required('Customer Name is required'),
    contacts: EasyForm.array(EasyForm.text().required('Contact is required'))
      .required('Contacts field is required')
      .minLength(1, 'Add at least one contact')
      .default(['+11 111 111 11', 'customer-name@example.com'])
  })
}
