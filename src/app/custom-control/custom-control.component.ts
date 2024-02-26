import {Component} from '@angular/core';
import {EasyFormControl} from "../../lib/easy-form-control";
import {FormControl} from "@angular/forms";
import {FormField} from "../../lib/interfaces/form-field";

@Component({
  selector: 'app-custom-control',
  standalone: true,
  imports: [],
  templateUrl: './custom-control.component.html',
  styleUrl: './custom-control.component.scss'
})
export class CustomControlComponent implements EasyFormControl {
  name: string = '';
  control!: FormControl;
  formField!: FormField;

}
