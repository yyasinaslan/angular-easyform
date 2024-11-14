import {Component} from '@angular/core';
import {EasyForm, EasyFormComponent, FormFieldDirective} from "@yyasinaslan/easyform";

@Component({
  selector: 'app-text-demo',
  standalone: true,
  imports: [
    EasyFormComponent,
    FormFieldDirective
  ],
  templateUrl: './text-demo.component.html',
  styleUrl: './text-demo.component.scss'
})
export class TextDemoComponent {


  form = EasyForm.create({
    name: EasyForm.text('','Name').required('Name is required')
      .minLength(3, 'Name must be at least 3 characters')
      .maxLength(10, 'Name must be at most 10 characters'),
  })
}
