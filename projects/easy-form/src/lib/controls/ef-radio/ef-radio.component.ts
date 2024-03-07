import {Component, Input} from '@angular/core';
import {EasyFormControl, FormErrorsComponent} from "easy-form";
import {ObservePipe} from "../../pipes/observe";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {FormField} from "../../interfaces/form-field";

@Component({
  selector: 'lib-ef-radio',
  standalone: true,
  imports: [
    FormErrorsComponent,
    ObservePipe,
    ReactiveFormsModule
  ],
  templateUrl: './ef-radio.component.html',
  styleUrl: './ef-radio.component.scss'
})
export class EfRadioComponent extends EasyFormControl {

}
