import {Component} from '@angular/core';
import {EasyFormControl, FormErrorsComponent} from "easy-form";
import {ReactiveFormsModule} from "@angular/forms";
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
export class EfCheckboxComponent extends EasyFormControl {
}
