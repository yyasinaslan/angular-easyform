import {Component} from '@angular/core';
import {EasyForm, EasyFormComponent, FormFieldDirective} from "@yyasinaslan/easyform";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-group-demo',
  standalone: true,
  imports: [
    EasyFormComponent,
    FormFieldDirective,
    NgClass
  ],
  templateUrl: './group-demo.component.html',
  styleUrl: './group-demo.component.scss'
})
export class GroupDemoComponent {
  form = EasyForm.create({
    customerName: EasyForm.text('','Customer Name').required('Customer Name is required'),
    address: EasyForm.group({
      street: EasyForm.text('','Street').required('Street is required'),
      city: EasyForm.text('','City').required('City is required'),
      country: EasyForm.text('','Country').required('Country is required'),
    })
  })
}
