import {Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {EasyFormControl, EfErrorsComponent, ObservePipe} from "@yyasinaslan/easyform";

@Component({
  selector: 'app-custom-text',
  standalone: true,
  imports: [
    ObservePipe,
    EfErrorsComponent,
    ReactiveFormsModule
  ],
  templateUrl: './custom-text.component.html',
  styleUrl: './custom-text.component.scss'
})
export class CustomTextComponent extends EasyFormControl {

}
