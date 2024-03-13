# {{ NgDocPage.title }}

`FormFieldDirective` used with `ng-container` to render form field at specific location in template.

## Path `@Input`

There are a few keypoints to remember when using path property of `FormFieldDirective`:

**Simple path:**

```html
<!-- Access simple top level path -->
<ng-container easyFormField path="email"/>
```

**Nested path:**

```html
<!-- Access form group path -->
<ng-container easyFormField path="address.street"/>
```

**Indexed path:**

```html
@for(customerControl of controls; track customerControl){
<ng-container easyFormField [path]="['customers', $index, 'name']"/>
}
```

## Props `@Input`

With `props` input of `FormFieldDirective` you can pass additional properties to the control component.

Example:

```html
<!-- Props -->
<ng-container easyFormField path="email" [props]="{placeholder: 'Email address'}"/>
```

**Note:** `props` input overrides props that defined in schema.

## Disabled `@Input`

You can disable form field by using `disabled` input of `FormFieldDirective`.

Example:

```html
<!-- Disabled -->
<ng-container easyFormField path="email" [disabled]="true"/>
```

## Change Event `@Output`

You can listen to field events by using `change` output of `FormFieldDirective`.

Example:

```html
<!-- Disabled -->
<ng-container easyFormField path="email" (change)="handleChange($event)"/>
```
```typescript
@Component({
  /* ... */
})
export class MyComponent {
  handleChange(value: any) {
    console.log(value);
  }
}
```

## Field Event `@Output`

You can listen to field events by using `fieldEvent` output of `FormFieldDirective`.

Example:

```html
<!-- Disabled -->
<ng-container easyFormField path="email" (fieldEvent)="handleInputEvent($event)"/>
```
```typescript
@Component({
  /* ... */
})
export class MyComponent {
  handleInputEvent(event: Event) {
    // Event represents any event from HTMLElement
    console.log(event);
  }
}
```

## Get Value With Ref

You can get value of form field by `value` getter.

Example:

```html
<!-- Get value with ref -->
<ng-container easyFormField path="role" #roleField="easyFormField"/>
@if(roleField.value === 'admin'){
<div>Be careful when giving admin role to user</div>
}
```
