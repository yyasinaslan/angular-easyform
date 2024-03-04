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
import {ObservableString} from "./pipes/observable-string";
import {SelectItems} from "easy-form";
import {ValidationChain} from "./validation-chain";

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

  public static text(label?: ObservableString, options?: GeneratorBaseOptions) {
    return new ValidationChain({...options, label, controlType: "text"});
  }

  public static email(label?: ObservableString, options?: GeneratorBaseOptions) {
    const vc = new ValidationChain({...options, label, controlType: "text"});
    if (!vc.props) vc.props = {};
    vc.props['type'] = "email";
    return vc;
  }

  public static number(label?: ObservableString, options?: GeneratorBaseOptions) {
    const vc = new ValidationChain({...options, label, controlType: "text"});
    if (!vc.props) vc.props = {};
    vc.props['type'] = "number";
    return vc;
  }

  public static select(items: SelectItems, label?: ObservableString, options?: GeneratorBaseOptions) {
    const vc = new ValidationChain({...options, label, controlType: BasicControlTypes.Select});
    if (!vc.props) vc.props = {};
    vc.props['items'] = items;
    return vc;
  }

  public static checkbox(label: string, options?: GeneratorBaseOptions) {
    return new ValidationChain({...options, label, controlType: BasicControlTypes.Checkbox});
  }

  public static group(schema: FormFieldGroup['fields'], options?: GeneratorBaseOptions) {
    return new ValidationChain({
      ...options,
      controlType: AdvancedControlTypes.Group,
      fields: schema as Record<string, FormFieldControl>
    });
  }

  public static array(schema: FormFieldArray['fields'] | FormFieldArraySimple['field'], options?: GeneratorBaseOptions) {
    const simpleArray = !!schema.controlType;
    if (simpleArray) {
      return new ValidationChain({
        ...options,
        controlType: AdvancedControlTypes.ArraySimple,
        field: schema as FormFieldControl
      });
    }
    return new ValidationChain({
      ...options,
      controlType: AdvancedControlTypes.Array,
      fields: schema as Record<string, FormFieldControl>
    });
  }
}
