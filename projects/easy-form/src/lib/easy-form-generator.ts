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

  public static text<ValueType = string>(value: ValueType, label?: ObservableString, configs?: GeneratorBaseOptions) {
    return new EasyFormField<ValueType>({...configs, label, initialValue: value, controlType: "text"});
  }

  public static textarea<ValueType = string>(value: ValueType, label?: ObservableString, configs?: GeneratorBaseOptions) {
    return new EasyFormField<ValueType>({...configs, label, initialValue: value, controlType: "textarea"});
  }

  public static select<ValueType = any>(value: ValueType, options: SelectOptions<any>, label?: ObservableString, configs?: GeneratorBaseOptions) {
    const vc = new EasyFormField<ValueType>({
      ...configs,
      label,
      initialValue: value,
      controlType: BasicControlTypes.Select
    });
    vc.options = options;
    return vc;
  }

  public static checkbox<ValueType = boolean>(value: ValueType, label?: ObservableString, configs?: GeneratorBaseOptions) {
    return new EasyFormField<ValueType>({
      ...configs,
      label,
      initialValue: value,
      controlType: BasicControlTypes.Checkbox
    });
  }

  public static switch<ValueType = any>(value: ValueType, label?: ObservableString, configs?: GeneratorBaseOptions) {
    return new EasyFormField<ValueType>({
      ...configs,
      label,
      initialValue: value,
      controlType: BasicControlTypes.Switch
    });
  }

  public static radio<ValueType = any>(value: ValueType, options: SelectOptions<any>, label?: ObservableString, configs?: GeneratorBaseOptions) {
    const vc = new EasyFormField<ValueType>({
      ...configs,
      label,
      initialValue: value,
      controlType: BasicControlTypes.Radio
    });
    vc.options = options;
    return vc;
  }

  public static custom<ValueType = any>(value: ValueType, type: string, label?: ObservableString, configs?: GeneratorBaseOptions) {
    return new EasyFormField<ValueType>({...configs, label, initialValue: value, controlType: type});
  }

  public static group<TValue>(schema: FormSchema<TValue>, configs?: GeneratorBaseOptions): EasyFormField<TValue> {
    return new EasyFormField<TValue>({
      ...configs,
      controlType: AdvancedControlTypes.Group,
      schema: schema
    });
  }

  public static array<TItem, TArray extends TItem[]>(schema: EasyFormField<TItem> | FormSchema<TItem>, configs?: GeneratorBaseOptions) {
    if (schema instanceof EasyFormField) {
      return new EasyFormField<TArray>({
        ...configs,
        controlType: AdvancedControlTypes.ArraySimple,
        schema: schema
      });
    }
    return new EasyFormField<TArray>({
      ...configs,
      controlType: AdvancedControlTypes.Array,
      schema: schema
    });
  }
}
