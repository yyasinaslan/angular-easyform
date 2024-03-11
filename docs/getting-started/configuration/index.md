# {{ NgDocPage.title }}

EasyForm comes with a set of built-in controls. The following controls are available out of the box:

- text: `EfTextComponent`,
- textarea: `EfTextAreaComponent`,
- select: `EfSelectComponent`,
- checkbox: `EfCheckboxComponent`,
- radio: `EfRadioComponent`

You can add more controls or modify the existing ones by setting the `controls` property in the `EasyFormConfig` object.

## Setting Custom Controls

You can provide configuration in app config.

```typescript
import {EASY_FORM_CONFIG, EasyFormConfig} from "easy-form";
import {CustomTextComponent} from "../input-components/custom-text/custom-text.component";

const customConfig = {
  provide: EASY_FORM_CONFIG,
  useValue: {
    controls: {
      // Replace the default text control with a custom one
      text: CustomTextComponent,

      // Add a new control
      myControl: MyControlComponent
    }
  } as EasyFormConfig
}
```

## Usage of Custom Controls

```typescript
import {EasyForm} from "./easy-form";

@Component({
  /* ... */
})
class AppComponent {
  form = EasyForm.create({
    name: EasyForm.custom('myControl', 'Name').required('Name is required'),
  })
}
```
