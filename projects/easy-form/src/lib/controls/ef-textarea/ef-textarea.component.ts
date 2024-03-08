import {Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
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
export class EfTextAreaComponent extends EasyFormControl {
}
