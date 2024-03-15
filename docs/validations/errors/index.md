# {{ NgDocPage.title }}

Library has built-in component for displaying validation errors `EfErrorsComponent`.

You can use it in your custom control component or in `EasyFormComponent` to display validation errors with giving path.

## Control component

```html
<!-- custom-text.component.html -->
<ef-errors [control]="control()!" [formField]="schema()!"/>
```

## Displaying Standalone Errors

It is useful to display `FormGroup` and `FormArray` control errors.

```html

<easy-form [form]="form">
  <!-- ... -->
  <ef-errors path="address"/>
  <!-- ... -->
</easy-form>
```
