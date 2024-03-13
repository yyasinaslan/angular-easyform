import {Component} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {
  ArrayItemTemplateDirective, ArrayWrapperTemplateDirective, EasyForm,
  EasyFormComponent,
  EfFormArrayComponent, EfTextComponent,
  FormFieldDirective
} from "@yyasinaslan/easyform";

@Component({
  selector: 'app-table-example',
  standalone: true,
  imports: [
    EasyFormComponent,
    EfFormArrayComponent,
    ArrayItemTemplateDirective,
    FormFieldDirective,
    ArrayWrapperTemplateDirective,
    NgTemplateOutlet,
    EfTextComponent,
    FormsModule
  ],
  templateUrl: './table-example.component.html',
  styleUrl: './table-example.component.scss'
})
export class TableExampleComponent {

  form = EasyForm.create({
    addresses: EasyForm.array({
      street: EasyForm.text().required('Street is required'),
      city: EasyForm.text().required('City is required'),
      state: EasyForm.text().required('State is required'),
      zip: EasyForm.text()
    })
  })

  addNewAddress() {
    this.form.addToArray('addresses', {
      street: '',
      city: '',
      state: '',
      zip: ''
    });
  }
}
