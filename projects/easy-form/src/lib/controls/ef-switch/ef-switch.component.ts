import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EasyFormControl } from '../../easy-form-control';
import { EfErrorsComponent } from '../../components/ef-errors/ef-errors.component';
import { ObservePipe } from '../../pipes/observe';

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
