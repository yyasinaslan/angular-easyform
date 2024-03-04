import {FormField, FormFieldBase} from "./interfaces/form-field";
import {BasicControlTypes} from "./interfaces/basic-control-types";
import {AdvancedControlTypes} from "./interfaces/advanced-control-types";
import {Validation} from "./interfaces/validation";
import {ObservableString} from "easy-form";
import {ValidatorFn, Validators} from "@angular/forms";

export class ValidationChain implements FormFieldBase {

  /**
   * The type of control to be rendered
   */
  controlType: string | BasicControlTypes | AdvancedControlTypes = '';

  validations: Record<string, Validation> = {};

  props?: Record<string, any>;

  initialValue?: any;


  constructor(options: FormField) {
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
   * @param key
   * @param validator
   * @param message
   */
  custom(key: string, validator: ValidatorFn, message: ObservableString) {
    if (this.validations && this.validations[key]) return this;

    if (!this.validations) this.validations = {};

    this.validations[key] = {validator, message};

    return this;
  }

}
