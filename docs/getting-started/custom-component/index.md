# {{ NgDocPage.title }}

EasyForm library allows you to create custom controls.
This is useful when you want to create a control that is not supported by the library.
And you can use it in your app forms anywhere you want.

## 1. Creating Component

Custom components should extend `EasyFormControl` class.
This class provides a few useful methods and properties.
See example component below.

```typescript group="custom-text" name="custom-text.component.ts" file="../../../src/app/input-components/custom-text/custom-text.component.ts"

```

```html group="custom-text" name="custom-text.component.html" file="../../../src/app/input-components/custom-text/custom-text.component.html"

```

## 2. Registering Component

There are two ways to register a custom component.

### Registering in app.config.ts (Globally)

```typescript
import {ApplicationConfig} from '@angular/core';
import {EASY_FORM_CONFIG, EasyFormConfig} from "easy-form";

export const appConfig: ApplicationConfig = {
  providers: [
    /* ... */
    {
      provide: EASY_FORM_CONFIG,
      useValue: {
        controls: {
          // Lazy load custom component
          customText: () => import('./input-components/custom-text/custom-text.component').then(m => m.CustomTextComponent),

          // Or register component directly
          customText: CustomTextComponent
        }
      } as EasyFormConfig
    }
    /* ... */
  ]
};

```

### EasyForm options (Form level)

```typescript
import {Component} from '@angular/core';
import {EasyForm} from "easy-form";

@Component({
  /* ... */
})
export class FormExampleComponent {

  form = EasyForm.create({
    name: EasyForm.text().required('Name is required'),
    phone: EasyForm.custom('customText', 'Phone').required('Phone is required'),
  }, {
    controls: {
      customText: CustomTextComponent
    }
  })
}

```

## 3. Usage of Custom Controls

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
