import {Component, signal} from '@angular/core';
import {
  EASY_FORM_CONFIG,
  EasyForm,
  EasyFormComponent,
  EasyFormConfig,
  FormFieldDirective,
  ObservePipe
} from "@yyasinaslan/easyform";
import {ComboboxComponent} from "../components/combobox/combobox.component";
import {MyForm} from "../my-form";
import {delay, map, of, timer} from "rxjs";
import {ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-prop-binding',
  standalone: true,
  imports: [
    EasyFormComponent,
    FormFieldDirective,
    ReactiveFormsModule,
    JsonPipe,
    ObservePipe
  ],
  templateUrl: './prop-binding.component.html',
  styleUrl: './prop-binding.component.scss',
  providers: [
    {
      provide: EASY_FORM_CONFIG,
      useValue: {
        controls: {
          combobox: ComboboxComponent
        }
      } as EasyFormConfig
    }
  ]
})
export class PropBindingComponent {

  multi = signal(true);

  observableLabel = timer(0, 1000)
    .pipe(map(n => 'option-label-' + n))

  formSchema = EasyForm.create({
    categories: MyForm.combobox([], this.createOptions(), 'Categories').required('Required'),
    name: MyForm.text('Name').required('Required'),
    address: MyForm.group({
      name: MyForm.text('', 'Address Name'),
      address: MyForm.text('', 'Address'),
      zip: MyForm.text('', 'Zip Code'),
    }),
    tags: MyForm.array(MyForm.text('', 'Tag')).default(['angular', 'rxjs']),
    connections: MyForm.array({
      email: MyForm.text('', 'Email'),
      enabled: MyForm.switch(false, 'Enabled'),
    }).default([{email: 'ss', enabled: true}])
  });

  value = this.formSchema.value;


  createOptions() {
    return of([
      {label: this.observableLabel, value: 1},
      {label: 'Option 2', value: 2},
      {label: 'Option 3', value: 3},
      {label: 'Option 4', value: 4},
      {label: 'Option 5', value: 5},
    ]).pipe(delay(1000))
  }

  logSubmit($event: any) {
    console.log($event)
  }
}

