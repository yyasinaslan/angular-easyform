# {{ NgDocPage.title }}

Instead of creating form array with single control, you can create form array with multiple controls.

## Create Form Array with Group

```typescript
const form = EasyForm.create({
  customerName: EasyForm.text('Customer Name').required('Customer Name is required'),
  contacts: EasyForm.array(
    // Give schema instead of single control
    {
      type: EasyForm.select(this.contactTypeOptions, 'Type').default('phone').required('Type is required'),
      contact: EasyForm.text('Contact').required('Contact is required')
    }
  )
    .required('Contacts field is required')
    .minLength(1, 'Add at least one contact')
    .default([{type: 'phone', contact: ''}])
})
```

## Rendering groups in Form Array

Inside of item template, you can access form group controls with array path and index.

```html
<ng-template arrayItem let-index="index">
  <ng-container easyFormField [path]="['contacts', index, 'type']"/>
  <ng-container easyFormField [path]="['contacts', index, 'contact']"/>
</ng-template>
```

## Demo

{{ NgDocActions.demo("groupArrayDemo", {expanded: true}) }}
