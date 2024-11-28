import {EasyForm, EasyFormField, ObservableString, SelectOptions} from "@yyasinaslan/easyform";
import {GeneratorBaseOptions} from "../../../easy-form/src/lib/easy-form-generator";

export class MyForm extends EasyForm {

  public static number<FormType = number>(value: FormType, label?: ObservableString, configs?: GeneratorBaseOptions): EasyFormField<FormType> {
    const field = new EasyFormField<FormType>({...configs, label, initialValue: value, controlType: "number"});
    field.props = {...field.props, type: 'number'};
    return field;
  }


  public static combobox<F = string[]>(value: F, options: SelectOptions<any>, label?: ObservableString, configs?: GeneratorBaseOptions): EasyFormField<F> {
    const field = this.custom<F>(value, 'combobox', label, configs);
    field.options = options;

    return field
  }

  public static otpInput(value:string, size: number, label?: ObservableString, configs?: GeneratorBaseOptions) {
    const field = this.custom<string>(value, 'otpInput', label, configs);
    field.props = {...field.props, size};
    return field
  }
}
