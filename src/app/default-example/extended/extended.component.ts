import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ExtendedTextControlComponent} from "./extended-text-control/extended-text-control.component";
import {GenericErrorComponent} from "./generic-error/generic-error.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-extended',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ExtendedTextControlComponent,
    GenericErrorComponent,
    NgClass
  ],
  templateUrl: './extended.component.html',
  styleUrl: './extended.component.scss'
})
export class ExtendedComponent {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormGroup({
      title: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
    }),
    phones: new FormArray<FormControl<string | null>>([
      new FormControl<string | null>(''),
    ])
  })

  handleSubmit(event: any) {
    console.log('handleSubmit', event)
    console.log(this.form.get(['phones', 1]))
  }

  addPhone() {
    const arr = this.form.get('phones') as FormArray<FormControl<string | null>>;
    arr.push(new FormControl<string | null>(''))
  }

  removePhone($index: number) {
    const arr = this.form.get('phones') as FormArray<FormControl<string | null>>;
    arr.removeAt($index)
  }

  get phonesControls() {
    const arr = this.form.get('phones') as FormArray<FormControl<string | null>>;
    return arr.controls;
  }
}
