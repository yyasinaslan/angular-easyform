import {Component, effect, signal} from '@angular/core';
import {EasyFormComponent} from "../../lib/easy-form/easy-form.component";
import {FormArrayTemplateDirective} from "../../lib/directives/form-array-template.directive";
import {FormFieldDirective} from "../../lib/directives/form-field.directive";
import {JsonPipe} from "@angular/common";
import {EasyForm} from "../../lib/easy-form";
import {TextWithActionComponent} from "../text-with-action/text-with-action.component";
import {FormGroup, Validators} from "@angular/forms";
import {AdvancedControlTypes} from "../../lib/interfaces/advanced-control-types";
import {EfFormArrayComponent} from "../../lib/components/ef-form-array/ef-form-array.component";
import {FormErrorsComponent} from "../../lib/components/form-errors/form-errors.component";

@Component({
  selector: 'app-ef-clear-example',
  standalone: true,
  imports: [
    EasyFormComponent,
    FormArrayTemplateDirective,
    FormFieldDirective,
    JsonPipe,
    EfFormArrayComponent,
    FormErrorsComponent
  ],
  templateUrl: './ef-clear-example.component.html',
  styleUrl: './ef-clear-example.component.scss'
})
export class EfClearExampleComponent {

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
          title: {
            controlType: 'text',
            label: 'Address Title',
            initialValue: '',
            validations: {
              required: {validator: Validators.required, message: 'Please give a name to your address'}
            }
          },
          street: {
            controlType: 'text',
            label: 'Street',
            initialValue: '',
            validations: {
              required: {validator: Validators.required, message: 'Street is required'}
            }
          }
        }
      },
      phones: {
        controlType: AdvancedControlTypes.ArraySimple,
        label: 'Phones',
        initialValue: ["2912313", "2131231"],
        field: {
          controlType: 'text',
          label: 'Phone Number'
        }
      },
      products: {
        controlType: AdvancedControlTypes.Array,
        label: 'Products',
        initialValue: [{name: 'Burger', price: '12.00'}],
        validations: {
          required: {validator: Validators.required, message: 'Products are required'},
          minlength: {validator: Validators.minLength(2), message: 'You should add at least 2 products'},
          maxlength: {validator: Validators.maxLength(3), message: 'You can add up to 3 products'}
        },
        fields: {
          name: {
            controlType: 'text', label: 'Name',
            validations: {required: {validator: Validators.required, message: 'Please give a name'}}
          },
          price: {
            controlType: 'text',
            label: 'Price',
            validations: {required: {validator: Validators.required, message: 'Please give a price'}}
          },
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
