import {ValidatorFn} from "@angular/forms";
import {ObservableString} from "./observable-string";

export interface Validation {
  // Validator name
  validator: ValidatorFn;

  // Validation message
  message: ObservableString;
}
