import {Component} from '@angular/core';
import {EasyFormControl} from "../../lib/easy-form-control";
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormField} from '../../lib/interfaces/form-field';
import {FormErrorsComponent} from "../../lib/components/form-errors/form-errors.component";

@Component({
  selector: 'app-text-with-action',
  standalone: true,
  imports: [
    FormErrorsComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './text-with-action.component.html',
  styleUrl: './text-with-action.component.scss'
})
export class TextWithActionComponent implements EasyFormControl {
  name = '';
  formField!: FormField;
  control!: FormControl<any>;
  props?: Record<string, any>;

}
