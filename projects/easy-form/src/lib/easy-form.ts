import {FormSchema} from "./interfaces/form-schema";
import {Validation} from "./interfaces/validation";
import {Signal} from "@angular/core";
import {Observable} from "rxjs";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {BasicControlTypes} from "./interfaces/basic-control-types";
import {ComponentType} from "./interfaces/component-type";
import {EasyFormControl} from "./easy-form-control";
import {
  FormField,
  FormFieldArray,
  FormFieldArraySimple,
  FormFieldControl,
  FormFieldGroup
} from "./interfaces/form-field";
import {AdvancedControlTypes} from "./interfaces/advanced-control-types";
import {EasyFormGenerator} from "./easy-form-generator";
import {EasyFormControlComponent, LazyLoadingComponent} from "./tokens/easy-form-config";

export interface EasyFormOptions<T = Record<string, any>> {
  showErrors?: 'submitted' | 'touched' | 'dirty' | 'always' | 'never';
  // Form based validations

  validations?: Record<string, Validation>;
  // Disabled state of the form

  disabled?: boolean | Signal<boolean> | Observable<boolean>;
  // Form field components

  components?: Record<string, EasyFormControlComponent | LazyLoadingComponent>
}

export class EasyForm<T = Record<string, any>> extends EasyFormGenerator {

  public formGroup: FormGroup;

  public schema!: FormSchema<T>;
  // default options
  public options: EasyFormOptions = {
    showErrors: 'submitted',
    components: {}
  };

  constructor(schema: FormSchema<T>, options?: EasyFormOptions<T>) {
    super();
    this.schema = schema;
    this.options = {...this.options, ...options};
    this.formGroup = this.createFormGroup(this.schema);
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

  /**
   * Create a new instance of EasyForm
   * @param schema
   * @param options
   */
  public static create<T>(schema: FormSchema<T>, options?: EasyFormOptions<T>) {
    return new EasyForm<T>(schema, options);
  }

  getSchema(path: string | Array<string | number>) {
    const normalisedPath = typeof path == 'string' ? path : path.join('.');
    return this._getSchemaWithPath(normalisedPath, this.schema);
  }

  disable() {
    this.formGroup.disable()
  }

  enable() {
    this.formGroup.enable()
  }

  getComponentType(type: BasicControlTypes | string) {
    if (!this.options.components) {
      return null;
    }
    const c = this.options.components[type];
    if (!c) {
      return null;
    }
    return c;
  }

  getControl<T = FormControl>(path: string | Array<string | number>) {
    return this.formGroup.get(path) as T;
  }

  getOptions() {
    return this.options;
  }

  getValue(path?: string | Array<string | number>) {
    if (path) {
      return this.formGroup.get(path)?.value;
    }
    return this.formGroup.value;
  }

  getRawValue(path?: string | Array<string | number>) {
    if (path) {
      return this.formGroup.get(path)?.getRawValue();
    }
    return this.formGroup.getRawValue();
  }

  setValue(value: any, path?: string | Array<string | number>) {
    if (path) {
      this.formGroup.get(path)?.setValue(value);
      return;
    }
    this.formGroup.setValue(value);
  }

  patchValue(value: any, path?: string | Array<string | number>) {
    if (path) {
      this.formGroup.get(path)?.patchValue(value);
      return;
    }
    this.formGroup.patchValue(value);
  }

  addToArray(path: string, value: any) {
    const arr = this.formGroup.get(path) as FormArray;
    const schema = this.getSchema(path);
    if (!schema) {
      throw new Error(`Cannot find form schema for ${path}`);
    }
    if (!arr) {
      throw new Error(`Cannot find form array for ${path}`);
    }

    if (schema.controlType === AdvancedControlTypes.Array) {
      const g = this.createFormGroup((schema as FormFieldArray).fields, value);
      arr.push(g);
      return;
    }

    if (schema.controlType === AdvancedControlTypes.ArraySimple) {
      const validations = (schema as FormFieldArraySimple).field.validations ?? {};
      const control = new FormControl(value, this.createValidations(validations));
      arr.push(control);
    }

  }

  removeFromArray(path: string, index: any) {
    const arr = this.formGroup.get(path) as FormArray;
    if (arr) {
      arr.removeAt(index)
    }
  }

  private createFormGroup(schema: FormSchema, initialValue?: any, validations?: FormField['validations']): FormGroup {
    const group = new FormGroup({});

    for (const key in schema) {
      const field = schema[key];
      if (field.controlType == 'group') {
        const g = this.createFormGroup((field as FormFieldGroup).fields, field.initialValue, field.validations);
        group.addControl(key, g);
      } else if (field.controlType == 'array') {
        const a = this.createFormArray((field as FormFieldArray).fields, field.initialValue, field.validations);
        group.addControl(key, a);
      } else if (field.controlType == 'arraySimple') {
        const a = this.createSimpleFormArray((field as FormFieldArraySimple), field.initialValue, field.validations);
        group.addControl(key, a);
      } else {
        const control = new FormControl(field.initialValue, field.validations ? this.createValidations(field.validations) : []);
        group.addControl(key, control);
      }
    }

    if (validations) {
      group.addValidators(this.createValidations(validations));
    }

    if (initialValue) {
      group.patchValue(initialValue);
    }

    return group;
  }

  private createFormArray(schema: FormSchema, initialValue?: any, validations?: FormField['validations']): FormArray {
    const array = new FormArray<any>([]);

    if (initialValue) {
      (initialValue as Array<any>).forEach((item: any) => {
        const group = this.createFormGroup(schema);
        group.patchValue(item);
        array.push(group);
      });
    }

    if (validations) {
      array.addValidators(this.createValidations(validations));
    }

    return array;
  }

  private createSimpleFormArray(schema: FormFieldArraySimple, initialValue?: any, validations?: FormField['validations']): FormArray {
    const array = new FormArray<any>([]);

    if (initialValue) {
      (initialValue as Array<any>).forEach((item: any, index) => {
        const control = new FormControl(item, schema.field.validations ? this.createValidations(schema.field.validations) : []);
        array.push(control);
      });
    }

    if (validations) {
      array.addValidators(this.createValidations(validations));
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

  private _getSchemaWithPath(path: string, schema: FormSchema | FormFieldGroup['fields'] | FormFieldArray['fields']): FormFieldControl | null {
    if (!path.match(/\./) && schema[path] && schema[path].controlType) {
      return schema[path] as FormFieldControl;
    }

    const head = path.split('.')[0];
    const tail = path.replace(/^\w+\./, '');

    const hasIndex = !!tail.match(/^[0-9]+/);
    if (hasIndex) {
      // phones.0.countryCode
      // phones.0
      const s = schema[head];
      if ((s as FormFieldArraySimple).field) {
        return (s as FormFieldArraySimple).field;
      }
      if ((s as FormFieldArray).fields) {
        return this._getSchemaWithPath(tail.replace(/^[0-9]+\./, ''), (s as FormFieldArray).fields);
      }
    }

    const childSchema = schema[head] as any;
    if (childSchema && childSchema.fields) {
      return this._getSchemaWithPath(tail, childSchema.fields);
    }

    return null;
  }
}
