import {FormFieldBase,} from "./interfaces/form-field";
import {ValidatorFn} from "@angular/forms";
import {BasicControlTypes} from "./interfaces/basic-control-types";
import {AdvancedControlTypes} from "./interfaces/advanced-control-types";
import {EasyFormField} from "./easy-form-field";
import {ObservableString} from "./interfaces/observable-string";
import {SelectOptions} from "./interfaces/select-options";
import {FormSchema} from "./interfaces/form-schema";

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

export type GeneratorBaseOptions = Omit<FormFieldBase, "label" | "validations">;

export abstract class EasyFormGenerator {

  public static text<FormType = string, RemoteType = FormType>(label?: ObservableString, configs?: GeneratorBaseOptions) {
    return new EasyFormField<FormType, RemoteType>({...configs, label, controlType: "text"});
  }

  public static textarea<FormType = string, RemoteType = FormType>(label?: ObservableString, configs?: GeneratorBaseOptions) {
    return new EasyFormField<FormType, RemoteType>({...configs, label, controlType: "textarea"});
  }

  public static select<FormType = any, RemoteType = FormType>(options: SelectOptions<FormType>, label?: ObservableString, configs?: GeneratorBaseOptions) {
    const vc = new EasyFormField<FormType, RemoteType>({...configs, label, controlType: BasicControlTypes.Select});
    vc.options = options;
    return vc;
  }

  public static checkbox<FormType = boolean, RemoteType = FormType>(label?: ObservableString, configs?: GeneratorBaseOptions) {
    return new EasyFormField<FormType, RemoteType>({...configs, label, controlType: BasicControlTypes.Checkbox});
  }

  public static switch<FormType = any, RemoteType = FormType>(label?: ObservableString, configs?: GeneratorBaseOptions) {
    return new EasyFormField<FormType, RemoteType>({...configs, label, controlType: BasicControlTypes.Switch});
  }

  public static radio<FormType = any, RemoteType = FormType>(options: SelectOptions<FormType>, label?: ObservableString, configs?: GeneratorBaseOptions) {
    const vc = new EasyFormField<FormType, RemoteType>({...configs, label, controlType: BasicControlTypes.Radio});
    vc.options = options;
    return vc;
  }

  public static custom<FormType = any, RemoteType = FormType>(type: string, label?: ObservableString, configs?: GeneratorBaseOptions) {
    return new EasyFormField<FormType, RemoteType>({...configs, label, controlType: type});
  }

  public static group<FormType = any, RemoteType = FormType>(schema: FormSchema<FormType>, configs?: GeneratorBaseOptions) {
    return new EasyFormField<FormType, RemoteType>({
      ...configs,
      controlType: AdvancedControlTypes.Group,
      schema: schema
    });
  }

  public static array<FormType = Array<any>, RemoteType = FormType>(schema: EasyFormField | Record<string, EasyFormField>, configs?: GeneratorBaseOptions) {
    if (schema instanceof EasyFormField) {
      return new EasyFormField<FormType, RemoteType>({
        ...configs,
        controlType: AdvancedControlTypes.ArraySimple,
        schema: schema
      });
    }
    return new EasyFormField<FormType, RemoteType>({
      ...configs,
      controlType: AdvancedControlTypes.Array,
      schema: schema
    });
  }
}
