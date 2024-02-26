import {Validation} from "./validation";
import {BasicControlTypes} from "./basic-control-types";
import {ComponentType} from "./component-type";
import {EasyFormControl} from "../easy-form-control";
import {FormSchema} from "./form-schema";
import {AdvancedControlTypes} from "./advanced-control-types";

type FormFieldBase = {
  // Field label
  label?: string;

  // Field initial value
  initialValue?: any;

  // Field validations
  validations?: Record<string, Validation>;

  // Hint
  hint?: string;

  // Additional props
  props?: Record<string, any>;
}

export type FormFieldGeneric = {
  // Field type
  controlType: string | BasicControlTypes | ComponentType<EasyFormControl>;
}

export type FormFieldGroup = {
  controlType: AdvancedControlTypes.Group | 'group';
  fields: FormSchema;
}
export type FormFieldArrray = {
  controlType: AdvancedControlTypes.Array | 'array';
  fields: FormSchema;
}
export type FormFieldArraySimple = {
  controlType: AdvancedControlTypes.ArraySimple | 'arraySimple'
  field: FormFieldGeneric;
}

export type FormField =
  FormFieldBase &
  (FormFieldGeneric
    | FormFieldGroup
    | FormFieldArrray
    | FormFieldArraySimple)
