import {FormFieldArray, FormFieldArraySimple, FormFieldBase, FormFieldGroup} from "./interfaces/form-field";
import {ValidatorFn, Validators} from "@angular/forms";
import {Validation} from "./interfaces/validation";
import {BasicControlTypes} from "./interfaces/basic-control-types";
import {AdvancedControlTypes} from "./interfaces/advanced-control-types";

interface EfDefaultValidations {
  required: (message: string) => FormFieldWithValidation;
  requiredTrue: (message: string) => FormFieldWithValidation;
  minLength: (minlength: number, message: string) => FormFieldWithValidation;
  maxLength: (length: number, message: string) => FormFieldWithValidation;
  email: (message: string) => FormFieldWithValidation;
  pattern: (pattern: string | RegExp, message: string) => FormFieldWithValidation;
  min: (min: number, message: string) => FormFieldWithValidation;
  max: (max: number, message: string) => FormFieldWithValidation;
  custom: (key: string, validator: ValidatorFn, message: string) => FormFieldWithValidation;
}

type FormFieldWithValidation = FormFieldBase & EfDefaultValidations;

class ValidationChain implements FormFieldBase {

  controlType: string | BasicControlTypes | AdvancedControlTypes = '';

  validations: Record<string, Validation> = {};

  props?: Record<string, any>;

  initialValue?: any;

  constructor(options: FormFieldBase & { controlType: string | BasicControlTypes | AdvancedControlTypes }) {
    Object.assign(this, options);
  }

  required(message: string) {
    if (this.validations && this.validations["required"]) return this

    if (!this.validations) this.validations = {};

    this.validations["required"] = {validator: Validators.required, message};

    return this;
  }

  minLength(minLength: number, message: string) {
    if (this.validations && this.validations["minlength"]) return this;

    if (!this.validations) this.validations = {};

    this.validations["minlength"] = {validator: Validators.minLength(minLength), message};

    return this;
  }

  maxLength(maxLength: number, message: string) {
    if (this.validations && this.validations["maxlength"]) return this;

    if (!this.validations) this.validations = {};

    this.validations["maxlength"] = {validator: Validators.maxLength(maxLength), message};

    return this;
  }

  email(message: string) {
    if (this.validations && this.validations["email"]) return this;

    if (!this.validations) this.validations = {};

    this.validations["email"] = {validator: Validators.email, message};

    return this;
  }

  pattern(pattern: string | RegExp, message: string) {
    if (this.validations && this.validations["pattern"]) return this;

    if (!this.validations) this.validations = {};

    this.validations["pattern"] = {validator: Validators.pattern(pattern), message};

    return this;
  }

  min(min: number, message: string) {
    if (this.validations && this.validations["min"]) return this;

    if (!this.validations) this.validations = {};

    this.validations["min"] = {validator: Validators.min(min), message};

    return this;
  }

  max(max: number, message: string) {
    if (this.validations && this.validations["max"]) return this;

    if (!this.validations) this.validations = {};

    this.validations["max"] = {validator: Validators.max(max), message};

    return this;
  }

  custom(key: string, validator: ValidatorFn, message: string) {
    if (this.validations && this.validations[key]) return this;

    if (!this.validations) this.validations = {};

    this.validations[key] = {validator, message};

    return this;
  }

}

type GeneratorBaseOptions = Omit<FormFieldBase, "label" | "validations">;

export abstract class EasyFormGenerator {

  public static Text(label?: string, options?: GeneratorBaseOptions) {
    return new ValidationChain({...options, label, controlType: "text"});
  }

  public static Email(label?: string, options?: GeneratorBaseOptions) {
    const vc = new ValidationChain({...options, label, controlType: "text"});
    if (!vc.props) vc.props = {};
    vc.props['type'] = "email";
    return vc;
  }

  public static Number(label?: string, options?: GeneratorBaseOptions) {
    const vc = new ValidationChain({...options, label, controlType: "text"});
    if (!vc.props) vc.props = {};
    vc.props['type'] = "number";
    return vc;
  }

  public static Group(fields: FormFieldGroup['fields']) {
    return {} as any;
  }

  public static Array(schema: FormFieldArray['fields'] | FormFieldArraySimple['field']) {
    console.log('schema', schema)
    if (schema.controlType) {
      console.log('simple array')
    } else {
      console.log('complex array')
    }
    return {} as any;
  }
}
