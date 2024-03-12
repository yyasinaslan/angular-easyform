import {Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {ObservePipe} from "../../pipes/observe";
import {EasyFormControl} from "../../easy-form-control";
import {EfErrorsComponent} from "../../components/ef-errors/ef-errors.component";

@Component({
  selector: 'ef-checkbox',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ObservePipe,
    EfErrorsComponent
  ],
  templateUrl: './ef-checkbox.component.html',
  styleUrl: './ef-checkbox.component.scss'
})
export class EfCheckboxComponent extends EasyFormControl {
}
