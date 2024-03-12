import {Component} from '@angular/core';
import {ObservePipe} from "../../pipes/observe";
import {ReactiveFormsModule} from "@angular/forms";
import {EasyFormControl} from "../../easy-form-control";
import {EfErrorsComponent} from "../../components/ef-errors/ef-errors.component";

@Component({
  selector: 'lib-ef-radio',
  standalone: true,
  imports: [
    ObservePipe,
    ReactiveFormsModule,
    EfErrorsComponent
  ],
  templateUrl: './ef-radio.component.html',
  styleUrl: './ef-radio.component.scss'
})
export class EfRadioComponent extends EasyFormControl {

}
