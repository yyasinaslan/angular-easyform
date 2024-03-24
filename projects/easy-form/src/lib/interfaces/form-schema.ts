import {EasyFormField} from "../easy-form-field";

/**
 * Define the shape of a form
 */
export type FormSchema<T = any> = {
  [key in keyof T]: EasyFormField<T[key]>
}
