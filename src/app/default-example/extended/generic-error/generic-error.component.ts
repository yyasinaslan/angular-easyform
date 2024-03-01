import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";

@Component({
  selector: 'app-generic-error',
  standalone: true,
  imports: [],
  templateUrl: './generic-error.component.html',
  styleUrl: './generic-error.component.scss'
})
export class GenericErrorComponent {
  @Input({
    required: true,
    transform: (value: AbstractControl): FormControl => value as FormControl
  }) control!: FormControl;
  @Input({required: true}) error!: string;
}
