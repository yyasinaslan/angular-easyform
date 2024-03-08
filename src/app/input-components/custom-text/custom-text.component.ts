import {Component} from '@angular/core';
import {EasyFormControl, FormErrorsComponent, ObservePipe} from "easy-form";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-custom-text',
  standalone: true,
  imports: [
    ObservePipe,
    FormErrorsComponent,
    ReactiveFormsModule
  ],
  templateUrl: './custom-text.component.html',
  styleUrl: './custom-text.component.scss'
})
export class CustomTextComponent extends EasyFormControl {

}
