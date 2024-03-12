import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ObservePipe} from "../../pipes/observe";
import {EasyFormControl} from "../../easy-form-control";
import {EfErrorsComponent} from "../../components/ef-errors/ef-errors.component";

@Component({
  selector: 'ef-select',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ObservePipe,
    EfErrorsComponent
  ],
  templateUrl: './ef-select.component.html',
  styleUrl: './ef-select.component.scss'
})
export class EfSelectComponent extends EasyFormControl {
}
