import {Component, effect, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {EasyFormComponent} from "../lib/easy-form/easy-form.component";
import {FormFieldComponent} from "../lib/components/form-field/form-field.component";
import {FormLabelDirective} from "../lib/directives/form-label.directive";
import {FormControlDirective} from "../lib/directives/form-control.directive";
import {FormErrorsComponent} from "../lib/components/form-errors/form-errors.component";
import {EasyForm} from "../lib/easy-form";
import {FormGroup, Validators} from "@angular/forms";
import {FormFieldDirective} from "../lib/directives/form-field.directive";
import {JsonPipe} from "@angular/common";
import {TextWithActionComponent} from "./text-with-action/text-with-action.component";

function t(template: TemplateStringsArray, ...args: any[]) {
  console.log(template, args);
  return 'empty';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EasyFormComponent, FormFieldComponent, FormLabelDirective, FormControlDirective, FormErrorsComponent, FormFieldDirective, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dynamic-form-2';

  disableSignal = signal(false);

  disableEffect = effect(() => {
      const disabled = this.disableSignal();
      if (disabled)
        this.form.disable();
      else
        this.form.enable();
    }
  )

  form = new EasyForm({
    schema: {
      // experimental: field({
      //   label: 'Experimental',
      //   controlType: 'text'
      // }).string().required('Experimental is required').min(2, 'sse'),
      // experimentalGroup: group({
      //   label: 'Experimental Group',
      //   fields: {
      //     field1: field({label: 'Field 1', controlType: 'text'}).string().required('Field 1 is required'),
      //   }
      // }),
      // experimentalArray: array({label: 'Addresses'}).fields({
      //   addressTitle: field({
      //     label: 'Address Title',
      //     controlType: 'text'
      //   }).string().required('Address Title is required'),
      // }),
      // experimentalSimpleArray: array({label: 'Simple addresses'}).required('Address Title is required'),


      name: {
        controlType: TextWithActionComponent,
        initialValue: '',
        label: 'Name',
        validations: {
          required: {
            validator: Validators.required,
            message: 'Name is required'
          }
        }
      },
      age: {
        controlType: 'text',
        initialValue: '',
        props: {
          type: 'number'
        },
        label: 'Age',
        validations: {
          required: {
            validator: Validators.required,
            message: 'Age is required'
          },
          min: {
            validator: Validators.min(18),
            message: 'Age should be greater than 18'
          }
        }
      },
      email: {
        controlType: 'text',
        initialValue: '',
        props: {
          type: 'email'
        },
        label: 'Email',
        validations: {
          required: {
            validator: Validators.required,
            message: 'Email is required'
          },
          email: {
            validator: Validators.email,
            message: 'Email is not valid'
          }
        }
      },
      address: {
        controlType: 'group',
        label: 'Address',
        fields: {
          name: {
            controlType: 'text',
            label: 'Address name',
            initialValue: '',
            validations: {
              required: {validator: Validators.required, message: 'Please give a name to your address'}
            }
          }
        }
      }
    },
  })


  showName = true;
  ageDisabled = false;

  save() {

    if (this.form.invalid) {
      return;
    }

    const data = this.form.value;
  }

  handleSubmit(event: FormGroup) {
    console.log(event.value);
  }
}
