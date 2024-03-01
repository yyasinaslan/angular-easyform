import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-extended-text-control',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './extended-text-control.component.html',
  styleUrl: './extended-text-control.component.scss'
})
export class ExtendedTextControlComponent {
  uuid = Math.random().toString(36).substring(2);
  @Input({required: true, transform: (value: AbstractControl): FormControl => value as FormControl}) control!: FormControl;
  @Input() label?: string;
}
