import {Component} from '@angular/core';
import {EasyFormControl} from "../../easy-form-control";
import {FormControl} from "@angular/forms";
import {FormField} from "../../interfaces/form-field";

@Component({
  selector: 'ef-select',
  standalone: true,
  imports: [],
  templateUrl: './ef-select.component.html',
  styleUrl: './ef-select.component.scss'
})
export class EfSelectComponent implements EasyFormControl {

  name = '';

  control!: FormControl;
  formField!: FormField;
}
