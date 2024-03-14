import {Component} from '@angular/core';
import {EasyFormControl} from "../../easy-form-control";
import {ReactiveFormsModule} from "@angular/forms";
import {ObservePipe} from "../../pipes/observe";
import {BindEventsDirective} from "../../directives/bind-events.directive";
import {EfErrorsComponent} from "../../components/ef-errors/ef-errors.component";

@Component({
  selector: 'ef-text',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ObservePipe,
    EfErrorsComponent,
    BindEventsDirective
  ],
  templateUrl: './ef-text.component.html',
  styleUrl: './ef-text.component.scss'
})
export class EfTextComponent extends EasyFormControl {
}
