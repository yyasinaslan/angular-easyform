import {ValidatorFn} from "@angular/forms";

export interface Validation {
  // Validator name
  validator: ValidatorFn;

  // Validation message
  message: string;
}
