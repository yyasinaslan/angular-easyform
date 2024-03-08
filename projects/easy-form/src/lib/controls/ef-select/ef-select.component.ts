import {Component} from '@angular/core';
import {EasyFormControl, FormErrorsComponent} from "easy-form";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
export class EfSelectComponent extends EasyFormControl {
}
