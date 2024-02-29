import {Component, Input} from '@angular/core';
import {EasyFormControl} from "../../easy-form-control";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {FormField} from "../../interfaces/form-field";
import {FormErrorsComponent} from "../../components/form-errors/form-errors.component";

@Component({
  selector: 'ef-text',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormErrorsComponent
  ],
  templateUrl: './ef-text.component.html',
  styleUrl: './ef-text.component.scss'
})
export class EfTextComponent implements EasyFormControl {

  name = '';

  control!: FormControl;
  formField!: FormField;

  @Input() props?: Record<string, any>;

}
