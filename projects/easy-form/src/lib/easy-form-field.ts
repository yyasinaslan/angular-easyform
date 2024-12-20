import {FormFieldBase} from "./interfaces/form-field";
import {BasicControlTypes} from "./interfaces/basic-control-types";
import {AdvancedControlTypes} from "./interfaces/advanced-control-types";
import {Validation} from "./interfaces/validation";
import {ValidatorFn, Validators} from "@angular/forms";
import {ObservableString} from "./interfaces/observable-string";
import {SelectOptions} from "./interfaces/select-options";
import {FormSchema} from "./interfaces/form-schema";


export class EasyFormField<FormType = any> implements FormFieldBase<FormType> {

  // Optional field id
  id?: string;

  // Field label
  label?: ObservableString;

  // Hint
  hint?: string;

  /**
   * The type of control to be rendered
   */
  controlType: string | BasicControlTypes | AdvancedControlTypes = '';

  validations: Record<string, Validation> = {};

  props?: Record<string, any>;

  initialValue?: FormType;

  options?: SelectOptions<any>;

  // transformer?: {
  //   toForm?: (value: RemoteType) => FormType;
  //   fromForm?: (value: FormType) => RemoteType;
  // }

  // Child schema for array or group
  // schema?: EasyFormField<FormType> | Record<keyof FormType, EasyFormField>;
  schema?: EasyFormField<FormType> | FormSchema<FormType>;

  constructor(options: FormFieldBase<FormType>) {
    Object.assign(this, options);
  }

  /**
   * Add a required validation to the field
   * @param message
   */
  required(message: ObservableString) {
    if (this.validations && this.validations["required"]) return this

    if (!this.validations) this.validations = {};

    this.validations["required"] = {validator: Validators.required, message};

    return this;
  }


  /**
   * Add a requiredTrue validation to the field
   * @param message
   */
  requiredTrue(message: ObservableString) {
    if (this.validations && this.validations["required"]) return this

    if (!this.validations) this.validations = {};

    this.validations["required"] = {validator: Validators.requiredTrue, message};

    return this;
  }

  /**
   * Add a minLength validation to the field
   * @param minLength
   * @param message
   */
  minLength(minLength: number, message: ObservableString) {
    if (this.validations && this.validations["minlength"]) return this;

    if (!this.validations) this.validations = {};

    this.validations["minlength"] = {validator: Validators.minLength(minLength), message};

    return this;
  }

  /**
   * Add a maxLength validation to the field
   * @param maxLength
   * @param message
   */
  maxLength(maxLength: number, message: ObservableString) {
    if (this.validations && this.validations["maxlength"]) return this;

    if (!this.validations) this.validations = {};

    this.validations["maxlength"] = {validator: Validators.maxLength(maxLength), message};

    return this;
  }

  /**
   * Add an email validation to the field
   * @param message
   */
  email(message: ObservableString) {
    if (this.validations && this.validations["email"]) return this;

    if (!this.validations) this.validations = {};

    this.validations["email"] = {validator: Validators.email, message};

    return this;
  }

  /**
   * Add a pattern validation to the field
   * @param pattern
   * @param message
   */
  pattern(pattern: string | RegExp, message: ObservableString) {
    if (this.validations && this.validations["pattern"]) return this;

    if (!this.validations) this.validations = {};

    this.validations["pattern"] = {validator: Validators.pattern(pattern), message};

    return this;
  }

  /**
   * Add a min validation to the field
   * @param min
   * @param message
   */
  min(min: number, message: ObservableString) {
    if (this.validations && this.validations["min"]) return this;

    if (!this.validations) this.validations = {};

    this.validations["min"] = {validator: Validators.min(min), message};

    return this;
  }

  /**
   * Add a max validation to the field
   * @param max
   * @param message
   */
  max(max: number, message: ObservableString) {
    if (this.validations && this.validations["max"]) return this;

    if (!this.validations) this.validations = {};

    this.validations["max"] = {validator: Validators.max(max), message};

    return this;
  }

  /**
   * Add a custom validation to the field
   * @param validator
   * @param messages
   */
  customValidator(validator: ValidatorFn, messages: Record<string, ObservableString>) {
    if (!this.validations) this.validations = {};

    Object.keys(messages).forEach(key => {
      this.validations[key] = {validator, message: messages[key]};
    });

    return this;
  }

  /**
   * Set the initial value of the field
   * @param value
   */
  default(value: FormType) {
    this.initialValue = value;
    return this;
  }

  /**
   * Transform the value
   * ! Not implemented yet
   * @param toForm
   * @notImplemented
   */
  // toForm(toForm: (value: RemoteType) => FormType) {
  //   if (!this.transformer) this.transformer = {};
  //   this.transformer.toForm = toForm;
  //   return this;
  // }

  /**
   * Transform the value
   * ! Not implemented yet
   * @param fromForm
   * @notImplemented
   */
  // fromForm(fromForm: (value: FormType) => RemoteType) {
  //   if (!this.transformer) this.transformer = {};
  //   this.transformer.fromForm = fromForm;
  //   return this;
  // }
}
