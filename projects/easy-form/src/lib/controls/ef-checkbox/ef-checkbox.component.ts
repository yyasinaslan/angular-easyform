import {Component, Input} from '@angular/core';
import {EasyFormControl, FormErrorsComponent} from "easy-form";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {FormField} from "../../interfaces/form-field";
import {ObservePipe} from "../../pipes/observe";

@Component({
  selector: 'ef-checkbox',
  standalone: true,
  imports: [
    FormErrorsComponent,
    ReactiveFormsModule,
    ObservePipe
  ],
  templateUrl: './ef-checkbox.component.html',
  styleUrl: './ef-checkbox.component.scss'
})
export class EfCheckboxComponent implements EasyFormControl {
  id = Math.random().toString(36).substring(2);

  name = 'text';

  control!: FormControl;
  formField!: FormField;

  @Input() props?: Record<string, any>;
}
