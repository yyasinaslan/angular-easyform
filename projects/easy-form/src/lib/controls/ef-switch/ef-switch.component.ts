import {Component} from '@angular/core';
import {EasyFormControl} from "../../easy-form-control";
import {EfErrorsComponent, ObservePipe} from "easy-form";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'lib-ef-switch',
  standalone: true,
  imports: [
    EfErrorsComponent,
    FormsModule,
    ObservePipe,
    ReactiveFormsModule
  ],
  templateUrl: './ef-switch.component.html',
  styleUrl: './ef-switch.component.scss'
})
export class EfSwitchComponent extends EasyFormControl {

}
