import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {FormField} from "../../interfaces/form-field";
import {ObservePipe} from "../../pipes/observe";
import {EasyFormControl, FormErrorsComponent} from "easy-form";

@Component({
  selector: 'ef-text',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormErrorsComponent,
    ObservePipe
  ],
  templateUrl: './ef-textarea.component.html',
  styleUrl: './ef-textarea.component.scss'
})
export class EfTextAreaComponent implements EasyFormControl {

  id = Math.random().toString(36).substring(2);

  name = 'textarea';

  control!: FormControl;
  formField!: FormField;

  @Input() props?: Record<string, any>;

}
