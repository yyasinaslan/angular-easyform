import {
  FormFieldArray,
  FormFieldArraySimple,
  FormFieldBase,
  FormFieldControl,
  FormFieldGroup
} from "./interfaces/form-field";
import {ValidatorFn} from "@angular/forms";
import {BasicControlTypes} from "./interfaces/basic-control-types";
import {AdvancedControlTypes} from "./interfaces/advanced-control-types";
import {SelectOptions} from "easy-form";
import {ValidationChain} from "./validation-chain";
import {ObservableString} from "./interfaces/observable-string";

interface EfDefaultValidations {
  required: (message: string) => FormFieldWithValidation;
  requiredTrue: (message: string) => FormFieldWithValidation;
  minLength: (minlength: number, message: string) => FormFieldWithValidation;
  maxLength: (length: number, message: string) => FormFieldWithValidation;
  email: (message: string) => FormFieldWithValidation;
  pattern: (pattern: string | RegExp, message: string) => FormFieldWithValidation;
  min: (min: number, message: string) => FormFieldWithValidation;
  max: (max: number, message: string) => FormFieldWithValidation;
  custom: (key: string, validator: ValidatorFn, message: string) => FormFieldWithValidation;
}

type FormFieldWithValidation = FormFieldBase & EfDefaultValidations;

type GeneratorBaseOptions = Omit<FormFieldBase, "label" | "validations">;

export abstract class EasyFormGenerator {

  public static text<FormType = string, RemoteType = FormType>(label?: ObservableString, configs?: GeneratorBaseOptions) {
    return new ValidationChain<FormType, RemoteType>({...configs, label, controlType: "text"});
  }

  public static email<FormType = string, RemoteType = FormType>(label?: ObservableString, configs?: GeneratorBaseOptions) {
    const vc = new ValidationChain<FormType, RemoteType>({...configs, label, controlType: "text"});
    if (!vc.props) vc.props = {};
    vc.props['type'] = "email";
    return vc;
  }

  public static password<FormType = string, RemoteType = FormType>(label?: ObservableString, configs?: GeneratorBaseOptions) {
    const vc = new ValidationChain<FormType, RemoteType>({...configs, label, controlType: "text"});
    if (!vc.props) vc.props = {};
    vc.props['type'] = "password";
    return vc;
  }

  public static number<FormType = number, RemoteType = FormType>(label?: ObservableString, configs?: GeneratorBaseOptions) {
    const vc = new ValidationChain<FormType, RemoteType>({...configs, label, controlType: "text"});
    if (!vc.props) vc.props = {};
    vc.props['type'] = "number";
    return vc;
  }

  public static select<FormType = any, RemoteType = FormType>(options: SelectOptions, label?: ObservableString, configs?: GeneratorBaseOptions) {
    const vc = new ValidationChain<FormType, RemoteType>({...configs, label, controlType: BasicControlTypes.Select});
    vc.options = options;
    return vc;
  }

  public static checkbox<FormType = any, RemoteType = FormType>(label: string, configs?: GeneratorBaseOptions) {
    return new ValidationChain<FormType, RemoteType>({...configs, label, controlType: BasicControlTypes.Checkbox});
  }

  public static date<FormType = any, RemoteType = FormType>(label: string, configs?: GeneratorBaseOptions) {
    const vc = new ValidationChain<FormType, RemoteType>({...configs, label, controlType: "text"});
    if (!vc.props) vc.props = {};
    vc.props['type'] = "date";
    return vc;
  }


  public static group<FormType = Record<string, any>, RemoteType = FormType>(schema: FormFieldGroup['fields'], configs?: GeneratorBaseOptions) {
    return new ValidationChain<FormType, RemoteType>({
      ...configs,
      controlType: AdvancedControlTypes.Group,
      fields: schema as Record<string, FormFieldControl>
    });
  }

  public static array<FormType = Array<any>, RemoteType = FormType>(schema: FormFieldArray['fields'] | FormFieldArraySimple['field'], configs?: GeneratorBaseOptions) {
    const simpleArray = !!schema.controlType;
    if (simpleArray) {
      return new ValidationChain<FormType, RemoteType>({
        ...configs,
        controlType: AdvancedControlTypes.ArraySimple,
        field: schema as FormFieldControl
      });
    }
    return new ValidationChain<FormType, RemoteType>({
      ...configs,
      controlType: AdvancedControlTypes.Array,
      fields: schema as Record<string, FormFieldControl>
    });
  }
}
