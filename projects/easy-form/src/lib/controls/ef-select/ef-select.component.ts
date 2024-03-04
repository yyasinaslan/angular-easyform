import {Component, Input} from '@angular/core';
import {EasyFormControl, FormErrorsComponent, ObservableStringPipe} from "easy-form";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormField} from "../../interfaces/form-field";

@Component({
  selector: 'ef-select',
  standalone: true,
  imports: [
    FormErrorsComponent,
    FormsModule,
    ObservableStringPipe,
    ReactiveFormsModule
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
