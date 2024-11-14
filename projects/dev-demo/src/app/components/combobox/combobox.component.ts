import {Component} from '@angular/core';
import {EasyFormControl, EfErrorsComponent, ObservePipe} from "@yyasinaslan/easyform";
import {AsyncPipe, JsonPipe} from "@angular/common";

@Component({
  selector: 'app-combobox',
  standalone: true,
  imports: [
    JsonPipe,
    ObservePipe,
    AsyncPipe,
    EfErrorsComponent
  ],
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.scss'
})
export class ComboboxComponent extends EasyFormControl {
}
