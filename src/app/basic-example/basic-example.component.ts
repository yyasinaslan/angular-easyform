import {Component} from '@angular/core';
import {EasyForm} from "../../lib/easy-form";
import {FormGroup, Validators} from "@angular/forms";
import {AdvancedControlTypes} from "../../lib/interfaces/advanced-control-types";
import {EasyFormComponent} from "../../lib/easy-form/easy-form.component";
import {FormFieldDirective} from "../../lib/directives/form-field.directive";

interface EmployeeModel {
  name: string;
  email: string
  phone: string;
  address: string;
}

@Component({
  selector: 'app-basic-example',
  standalone: true,
  imports: [
    EasyFormComponent,
    FormFieldDirective
  ],
  templateUrl: './basic-example.component.html',
  styleUrl: './basic-example.component.scss'
})
export class BasicExampleComponent {

  // Employee form
  form = new EasyForm({
    schema: {
      name: {
        controlType: 'text',
        label: 'Name',
        validations: {
          required: {validator: Validators.required, message: 'Name is required'}
        }
      },
      email: {
        controlType: 'text',
        label: 'Email',
        validations: {
          required: {validator: Validators.required, message: 'Email is required'},
          email: {validator: Validators.email, message: 'Invalid email'}
        }
      },
      phone: {
        controlType: 'text',
        label: 'Phone',
        validations: {
          required: {validator: Validators.required, message: 'Phone is required'}
        }
      },
      address: {
        controlType: AdvancedControlTypes.Group,
        label: 'Address',
        fields: {
          street: {
            controlType: 'text',
            label: 'Street',
            validations: {
              required: {validator: Validators.required, message: 'Street is required'}
            }
          },
          city: {
            controlType: 'text',
            label: 'City',
            validations: {
              required: {validator: Validators.required, message: 'City is required'}
            }
          },
          state: {
            controlType: 'text',
            label: 'State',
            validations: {
              required: {validator: Validators.required, message: 'State is required'}
            }
          },
          zip: {
            controlType: 'text',
            label: 'Zip',
            validations: {
              required: {validator: Validators.required, message: 'Zip is required'}
            }
          }
        }
      }
    }
  })
  //
  // f1 = new EasyForm({
  //   schema: {
  //     name: EasyForm.text('Name', {}).required('Name is required').minLength(3, 'Name must be at least 3 characters'),
  //     address: EasyForm.group('Address', {
  //       street: EasyForm.text('Street', {}).required('Street is required'),
  //       city: EasyForm.text('City', {}).required('City is required'),
  //       state: EasyForm.text('State', {}).required('State is required'),
  //       zip: EasyForm.text('Zip', {}).required('Zip is required')
  //     }, {}),
  //     phones: EasyForm.array('Phones', {
  //       countryCode: EasyForm.text('Country Code', {}).required('Country code is required'),
  //       number: EasyForm.text('Number', {}).required('Number is required')
  //     }, {})
  //   }
  // })

  handleSubmit($event: FormGroup) {
    console.log('Form submitted', $event.value)
  }
}
