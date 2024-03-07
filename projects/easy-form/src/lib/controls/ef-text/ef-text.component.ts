import {Component, Input} from '@angular/core';
import {EasyFormControl} from "../../easy-form-control";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {FormField} from "../../interfaces/form-field";
import {FormErrorsComponent} from "../../components/form-errors/form-errors.component";
import {ObservePipe} from "../../pipes/observe";
import {FormFieldDirective} from "../../directives/form-field.directive";

@Component({
  selector: 'ef-text',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormErrorsComponent,
    ObservePipe
  ],
  templateUrl: './ef-text.component.html',
  styleUrl: './ef-text.component.scss'
})
export class EfTextComponent extends EasyFormControl {
}
