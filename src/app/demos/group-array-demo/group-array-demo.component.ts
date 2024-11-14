import {Component} from '@angular/core';
import {
  ArrayItemTemplateDirective,
  EasyForm,
  EasyFormComponent,
  EfErrorsComponent,
  EfFormArrayComponent,
  FormFieldDirective
} from "@yyasinaslan/easyform";

@Component({
  selector: 'app-group-array-demo',
  standalone: true,
  imports: [
    ArrayItemTemplateDirective,
    EasyFormComponent,
    EfErrorsComponent,
    EfFormArrayComponent,
    FormFieldDirective
  ],
  templateUrl: './group-array-demo.component.html',
  styleUrl: './group-array-demo.component.scss'
})
export class GroupArrayDemoComponent {
  contactTypeOptions = [
    {label: 'Phone', value: 'phone'},
    {label: 'Email', value: 'email'}
  ]

  form = EasyForm.create({
    customerName: EasyForm.text('','Customer Name').required('Customer Name is required'),
    contacts: EasyForm.array({
      type: EasyForm.select(this.contactTypeOptions, 'Type').default('phone').required('Type is required'),
      contact: EasyForm.text('','Contact').required('Contact is required')
    })
      .required('Contacts field is required')
      .minLength(1, 'Add at least one contact')
      .default([{type: 'phone', contact: ''}])
  })
}
