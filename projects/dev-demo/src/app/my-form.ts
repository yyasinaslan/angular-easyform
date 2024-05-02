import {EasyForm, EasyFormField, ObservableString} from "@yyasinaslan/easyform";
import {GeneratorBaseOptions} from "../../../easy-form/src/lib/easy-form-generator";

export class MyForm extends EasyForm {

  public static number<FormType = number, RemoteType = FormType>(label?: ObservableString, configs?: GeneratorBaseOptions) {
    const field = new EasyFormField<FormType, RemoteType>({...configs, label, controlType: "number"});
    field.props = {...field.props, type: 'number'};
    return field;
  }
}
