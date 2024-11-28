import {FormSchema} from "./interfaces/form-schema";
import {Validation} from "./interfaces/validation";
import {Signal} from "@angular/core";
import {Observable} from "rxjs";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {BasicControlTypes} from "./interfaces/basic-control-types";
import {AdvancedControlTypes} from "./interfaces/advanced-control-types";
import {EasyFormGenerator} from "./easy-form-generator";
import {EasyFormControlComponent, LazyLoadingComponent} from "./tokens/easy-form-config";
import {EasyFormField} from "./easy-form-field";

export interface EasyFormOptions {
  showErrors?: 'submitted' | 'touched' | 'dirty' | 'always' | 'never';
  // Form based validations

  validations?: Record<string, Validation>;
  // Disabled state of the form

  disabled?: boolean | Signal<boolean> | Observable<boolean>;
  // Form field components

  components?: Record<string, EasyFormControlComponent | LazyLoadingComponent>
}

export type InferValueType<Schema extends FormSchema> = { [key in keyof Schema]: Schema[key]['initialValue'] };

export class EasyForm<ValueType = any> extends EasyFormGenerator {

  /**
   * Reactivity of actual form is managed by angular reactive form
   */
  public formGroup: FormGroup;

  public schema!: FormSchema<ValueType>;

  // default options
  public options: EasyFormOptions = {
    showErrors: 'submitted',
    components: {}
  };

  constructor(schema: FormSchema<ValueType>, options?: EasyFormOptions) {
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

  get value(): ValueType {
    return this.formGroup.value;
  }

  get valueChanges(): Observable<ValueType> {
    return this.formGroup.valueChanges;
  }

  /**
   * Create a new instance of EasyForm
   * @param schema
   * @param options
   */
  public static create<T = any>(schema: FormSchema<T>, options?: EasyFormOptions) {
    return new EasyForm<T>(schema, options);
  }

  /**
   * Traverse through schema and get definition
   * @param path
   */
  getSchema(path: string | Array<string | number>) {
    const normalisedPath = typeof path == 'string' ? path.split('.') : path;
    if (!path || path.length == 0) {
      return null;
    }
    return this._getSchemaWithPath(normalisedPath, this.schema);
  }

  /**
   * Disable all form
   */
  disable() {
    this.formGroup.disable()
  }

  /**
   * Enable all form
   */
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

  getControl<ControlType = FormControl>(path: string | Array<string | number>) {
    return this.formGroup.get(path) as ControlType;
  }

  getArrayControls(path: string | Array<string | number>) {
    const arrayControl = this.getControl<FormArray>(path);
    if (!arrayControl) return [];
    return arrayControl.controls as FormControl[];
  }

  getValue<ValueType = any>(path?: string | Array<string | number>): ValueType {
    if (path) {
      return this.formGroup.get(path)?.value;
    }
    return this.formGroup.value;
  }

  getRawValue<ValueType = any>(path?: string | Array<string | number>): ValueType {
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
      const g = this.createFormGroup(schema.schema as Record<string, EasyFormField>, value);
      arr.push(g);
    } else if (schema.controlType === AdvancedControlTypes.ArraySimple) {
      const arrayField = schema.schema as EasyFormField;
      const validations = arrayField.validations ?? {};
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

  private createFormGroup(schema: FormSchema, initialValue?: any, validations?: EasyFormField['validations']): FormGroup {
    const group = new FormGroup({});

    for (const key in schema) {
      const field = schema[key];
      if (field.controlType == 'group') {
        const g = this.createFormGroup(field.schema as Record<string, EasyFormField>, field.initialValue, field.validations);
        group.addControl(key, g);
      } else if (field.controlType == 'array') {
        const a = this.createFormArray(field.schema as Record<string, EasyFormField>, field.initialValue, field.validations);
        group.addControl(key, a);
      } else if (field.controlType == 'arraySimple') {
        const a = this.createSimpleFormArray(field as any, field.initialValue, field.validations);
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

  private createFormArray(schema: FormSchema, initialValue?: any, validations?: EasyFormField['validations']): FormArray {
    const array = new FormArray<any>([]);

    if (initialValue && Array.isArray(initialValue)) {
      initialValue.forEach((item: any) => {
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

  private createSimpleFormArray(schema: EasyFormField, initialValue?: any, validations?: EasyFormField['validations']): FormArray {
    const array = new FormArray<any>([]);
    const field = schema.schema as EasyFormField;

    if (initialValue && Array.isArray(initialValue)) {
      initialValue.forEach((item: any, index) => {
        const control = new FormControl(item, field.validations ? this.createValidations(field.validations) : []);
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

  private _getSchemaWithPath(path: (string | number)[], schema: FormSchema | EasyFormField): FormSchema | EasyFormField | null {
    const head = path[0];
    const tail = path.slice(1)

    const hasIndex = !!head.toString().match(/^[0-9]+/);
    if (hasIndex) {
      if (schema instanceof EasyFormField) {
        return schema ?? null;
      } else {
        if (tail.length == 0) {
          return schema ?? null;
        } else {
          return this._getSchemaWithPath(tail, schema);
        }
      }
    }


    if (schema instanceof EasyFormField) {
      return schema.schema ?? null;
    }

    const childSchema = (schema as Record<string, EasyFormField>)[head.toString()];
    if (childSchema) {
      if (tail.length == 0) {
        return childSchema;
      } else {
        return this._getSchemaWithPath(tail, childSchema.schema ?? {});
      }
    }

    return null;
  }
}
