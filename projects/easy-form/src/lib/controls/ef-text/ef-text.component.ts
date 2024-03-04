import {Component, Input} from '@angular/core';
import {EasyFormControl} from "../../easy-form-control";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {FormField} from "../../interfaces/form-field";
import {FormErrorsComponent} from "../../components/form-errors/form-errors.component";
import {ObservableStringPipe} from "easy-form";

@Component({
  selector: 'ef-text',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormErrorsComponent,
    ObservableStringPipe
  ],
  templateUrl: './ef-text.component.html',
  styleUrl: './ef-text.component.scss'
})
export class EfTextComponent implements EasyFormControl {

  id = Math.random().toString(36).substring(2);

  name = 'text';

  control!: FormControl;
  formField!: FormField;

  @Input() props?: Record<string, any>;

}
