import {Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {ObservePipe} from "../../pipes/observe";
import {EasyFormControl} from "../../easy-form-control";
import {EfErrorsComponent} from "../../components/ef-errors/ef-errors.component";

@Component({
  selector: 'ef-text',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ObservePipe,
    EfErrorsComponent
  ],
  templateUrl: './ef-textarea.component.html',
  styleUrl: './ef-textarea.component.scss'
})
export class EfTextAreaComponent extends EasyFormControl {
}
