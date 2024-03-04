import {FormField} from "./form-field";

/**
 * Define the shape of a form
 */
export type FormSchema<T = Record<string, any>> = {
  [key in keyof T]: FormField;
};
