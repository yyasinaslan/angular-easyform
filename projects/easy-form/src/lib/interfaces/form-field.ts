import {Validation} from "./validation";
import {BasicControlTypes} from "./basic-control-types";
import {ComponentType} from "./component-type";
import {EasyFormControl} from "../easy-form-control";
import {AdvancedControlTypes} from "./advanced-control-types";
import {ObservableString} from "./observable-string";
import {SelectOptions} from "easy-form";

export type FormFieldBase<FormType = any, RemoteType = FormType> = {

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

  transformer?: {
    toForm?: (value: RemoteType) => FormType;
    fromForm?: (value: FormType) => RemoteType;
  }
}

export type FormFieldGeneric = {
  // Field type
  controlType: string | BasicControlTypes | ComponentType<EasyFormControl>;
}

export type FormFieldControl = FormFieldBase & FormFieldGeneric;

export type FormFieldGroup = {
  controlType: AdvancedControlTypes.Group | 'group';
  fields: Record<string, FormFieldControl>;
}
export type FormFieldArray = {
  controlType: AdvancedControlTypes.Array | 'array';
  fields: Record<string, FormFieldControl>;
}
export type FormFieldArraySimple = {
  controlType: AdvancedControlTypes.ArraySimple | 'arraySimple'
  field: FormFieldControl;
  initialValue?: any[];
}

export type FormField =
  FormFieldBase &
  (FormFieldGeneric | FormFieldGroup | FormFieldArray | FormFieldArraySimple)
