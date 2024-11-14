import {Component} from '@angular/core';
import {MyForm} from "../my-form";
import {EasyFormComponent, FormFieldDirective} from "@yyasinaslan/easyform";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-custom-form-example',
  standalone: true,
  imports: [
    EasyFormComponent,
    FormFieldDirective
  ],
  templateUrl: './custom-form-example.component.html',
  styleUrl: './custom-form-example.component.scss'
})
export class CustomFormExampleComponent {
  form = MyForm.create({
    numberTest: MyForm.number(5, 'Number Test').min(5, 'Number must be at least 5').max(10, 'Number must be at most 10'),
  });

  submitted($event: FormGroup) {
    console.log($event.value);
  }
}
