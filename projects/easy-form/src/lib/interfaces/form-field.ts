import {Validation} from "./validation";
import {BasicControlTypes} from "./basic-control-types";
import {AdvancedControlTypes} from "./advanced-control-types";
import {ObservableString} from "./observable-string";
import {SelectOptions} from "./select-options";
import {EasyFormField} from "../easy-form-field";

export type FormFieldBase<FormType = any, RemoteType = FormType> = {
  controlType?: string | BasicControlTypes | AdvancedControlTypes;
  // Optional field id
  id?: string;

  // Field label
  label?: ObservableString;

  // Field initial value
  initialValue?: RemoteType;

  // Field validations
  validations?: Record<string, Validation>;

  // Hint
  hint?: string;

  // Additional props
  props?: Record<string, HTMLInputElement['attributes']>;

  // select options
  options?: SelectOptions<FormType>;

  // transformer?: {
  //   toForm?: (value: RemoteType) => FormType;
  //   fromForm?: (value: FormType) => RemoteType;
  // }

  // Child schema for array or group
  schema?: EasyFormField | Record<string, EasyFormField>;
}
