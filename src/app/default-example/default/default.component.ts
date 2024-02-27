import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {

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
