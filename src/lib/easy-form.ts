import {FormSchema} from "./interfaces/form-schema";
import {Validation} from "./interfaces/validation";
import {Signal} from "@angular/core";
import {Observable} from "rxjs";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {EfTextComponent} from "./controls/ef-text/ef-text.component";
import {BasicControlTypes} from "./interfaces/basic-control-types";
import {ComponentType} from "./interfaces/component-type";
import {EasyFormControl} from "./easy-form-control";
import {EfSelectComponent} from "./controls/ef-select/ef-select.component";
import {FormFieldArrray, FormFieldGroup} from "./interfaces/form-field";

export interface EasyFormOptions {
  showErrors?: 'submitted' | 'touched' | 'dirty' | 'always' | 'never';

  // Form fields
  schema: FormSchema;

  // Form based validations
  validations?: Array<Validation>;

  // Disabled state of the form
  disabled?: boolean | Signal<boolean> | Observable<boolean>;

  // Form field components
  components?: Record<string, ComponentType<EasyFormControl>>
}

export class EasyForm {

  public formGroup: FormGroup;
  // default options
  public options: EasyFormOptions = {
    showErrors: 'submitted',
    schema: {},
    components: {
      text: EfTextComponent,
      select: EfSelectComponent
    }
  };

  constructor(options: EasyFormOptions) {
    this.options = {...this.options, ...options};
    this.formGroup = this.createFormGroup(this.options.schema);
  }

  private createFormGroup(schema: FormSchema, initialValue?: any): FormGroup {
    const group = new FormGroup({});

    for (const key in schema) {
      const field = schema[key];
      if (field.controlType == 'group') {
        const g = this.createFormGroup((field as FormFieldGroup).fields, field.initialValue);
        group.addControl(key, g);
      } else if (field.controlType == 'array') {
        const a = this.createFormArray((field as FormFieldArrray).fields, field.initialValue);
        group.addControl(key, a);
      } else {
        const control = new FormControl(field.initialValue, field.validations ? this.createValidations(field.validations) : []);
        group.addControl(key, control);
      }
    }

    if (initialValue) {
      group.patchValue(initialValue);
    }

    return group;
  }

  private createFormArray(schema: FormSchema, initialValue?: any): FormArray {
    const array = new FormArray<any>([]);

    if (initialValue) {
      (initialValue as Array<any>).forEach((item: any) => {
        const group = this.createFormGroup(schema);
        group.patchValue(item);
        array.push(group);
      });
    }

    return array;
  }

  private createValidations(validations: Record<string, Validation>) {
    const validators = [];
    if (validations) {
      for (const validationKey in validations) {
        const v = validations[validationKey];
        validators.push(v.validator);
      }
    }
    return validators;
  }

  getSchema(name: string) {
    return this.options.schema[name];
  }

  get invalid() {
    return this.formGroup.invalid;
  }

  get valid() {
    return this.formGroup.valid;
  }

  get value() {
    return this.formGroup.value;
  }

  disable() {
    this.formGroup.disable()
  }

  enable() {
    this.formGroup.enable()
  }

  getComponent(type: BasicControlTypes | string) {
    if (!this.options.components) {
      return null;
    }
    const c = this.options.components[type];
    if (!c) {
      return null;
    }
    return c;
  }

  getControl(key: string) {
    return this.formGroup.get(key) as FormControl;
  }

  getOptions() {
    return this.options;
  }

}
