import {Component, Input} from '@angular/core';
import {EasyFormControl, FormErrorsComponent} from "easy-form";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormField} from "../../interfaces/form-field";
import {ObservePipe} from "../../pipes/observe";

@Component({
  selector: 'ef-select',
  standalone: true,
  imports: [
    FormErrorsComponent,
    FormsModule,
    ReactiveFormsModule,
    ObservePipe
  ],
  templateUrl: './ef-select.component.html',
  styleUrl: './ef-select.component.scss'
})
export class EfSelectComponent  implements EasyFormControl {

  id = Math.random().toString(36).substring(2);

  name = 'text';

  control!: FormControl;
  formField!: FormField;

  @Input() props?: Record<string, any>;

}
