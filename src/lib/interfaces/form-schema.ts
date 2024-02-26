import {FormField} from "./form-field";

/**
 * Define the shape of a form
 */
export interface FormSchema {
  [key: string]: FormField;
}
