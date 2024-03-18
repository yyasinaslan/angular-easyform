# {{ NgDocPage.title }}

`EasyForm` provides `array` method to create form arrays inside main schema.

In this page we will create simple form array with single input.
We will also see how to add and remove controls from form array.

For array with multiple controls, see [Form Array with Group](/docs/advanced-controls/form-array-with-group).

## Create Form Array

Define form array in schema using `array` method.
Put any control schema as argument to `array` method.

```typescript
const form = EasyForm.create({
  contacts: EasyForm.array(EasyForm.text().required('Contact is required'))
})
```

### Validations

You can also add validations to form array.

```typescript
const form = EasyForm.create({
  contacts: EasyForm.array(EasyForm.text().required('Contact is required'))
    .required('Contacts field is required')
    .minLength(1, 'Add at least one contact')
})
```

### Default Value

You can give default value to form array using `default` method.

```typescript
const form = EasyForm.create({
  contacts: EasyForm.array(EasyForm.text().required('Contact is required'))
    .default(['+11 111 111 11', 'customer-name@example.com'])
})
```

> **Warning** Default value should be array of values, where each value is default value for each control in form array.

> **Warning** Default value of array will override default value of controls inside array.

## Rendering Form Array

Library provides `EfFormArrayComponent` to show form array in UI.

Put ng-template with `arrayItem` directive inside `EfFormArrayComponent` to render each control in form array. See `ArrayItemTemplateDirective`.

```html

<ef-form-array path="contacts" class="block space-y-4">
  <ng-template arrayItem let-index="index">
    <div class="flex justify-between items-center gap-2">
      <div class="flex-auto">
        <ng-container easyFormField [path]="['contacts', index]"/>
      </div>
      <button type="button" class="delete-button" (click)="form.removeFromArray('contacts',index)">Delete</button>
    </div>
  </ng-template>
</ef-form-array>
```

### Custom Rendering

You can achieve same thing with angular for loop. With `form.getArrayControls('path')` method you can get controls of array.

`EfFormArrayComponent` does same thing under the hood.

```html
@for (control of form.getArrayControls('contacts'); track control) {
<ng-container easyFormField [path]="['contacts', $index]"/>
}
```

## Add and Remove Items

There are helper methods to add and remove controls from form array.

### Add Item `addToArray`

Use `addToArray` method to add new control to form array with default value.

```html

<button type="button" (click)="form.addToArray('contacts', '')">+ Add</button>

```

### Remove Item `removeFromArray`

Use `removeFromArray` method to remove control from form array with given index.

```html

<button type="button" (click)="form.removeFromArray('contacts',index)">Delete</button>

```

## Demo

{{ NgDocActions.demo("arrayDemo", {expanded: true}) }}
