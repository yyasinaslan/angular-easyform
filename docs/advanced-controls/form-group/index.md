# {{ NgDocPage.title }}

`EasyForm` provides `group` method to create form groups inside main schema.

## Usage

Define form group in schema using `group` method.
Give group schema as argument to `group` method similar to `create` method.

```typescript
import {EasyForm} from "./easy-form";

const form = EasyForm.create({
  address: EasyForm.group({
    street: EasyForm.text().required('Street is required'),
    city: EasyForm.text().required('City is required'),
  })
})
```
You can render form group control using dot notation in path or giving as array of string.
You can see example below.

```html
<!-- Dot notation -->
<ng-container easyFormField path="address.street"/>
<!-- Array access -->
<ng-container easyFormField [path]="['address','city']"/>
```

## Example

{{ NgDocActions.demo("groupDemo", {expanded: true}) }}
