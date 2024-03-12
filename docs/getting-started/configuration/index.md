# {{ NgDocPage.title }}

EasyForm comes with a set of built-in controls. The following controls are available out of the box:

| Control Type (string) | Component             | Usage Guide                            |
|-----------------------|-----------------------|----------------------------------------|
| text                  | `EfTextComponent`     | [Text](/docs/basic-controls/text)      |
| textarea              | `EfTextAreaComponent` | [Text Area](/docs/basic-controls/text) |
| select                | `EfSelectComponent`   | [Select](/docs/basic-controls/text)    |
| checkbox              | `EfCheckboxComponent` | [Checkbox](/docs/basic-controls/text)  |
| radio                 | `EfRadioComponent`    | [Radio](/docs/basic-controls/text)     |

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
      // You can replace the default text control with a custom one
      text: CustomTextComponent,

      // Add a new control
      myControl: MyControlComponent
    }
  } as EasyFormConfig
}
```

## Lazy Loading the Custom Controls

```typescript
import {EASY_FORM_CONFIG, EasyFormConfig} from "easy-form";

const customConfig = {
  provide: EASY_FORM_CONFIG,
  useValue: {
    controls: {
      customText: () => 
        import('../input-components/custom-text/custom-text.component').then(m => m.CustomTextComponent),
    }
  } as EasyFormConfig
}
```
