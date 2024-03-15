# {{ NgDocPage.title }}

This library provides a set of built-in validators that can be used to validate forms.
It is using validators from the `@angular/forms` package under the hood.

## Required

The `required` validator is used to check if a control has a value.

Usage:

```typescript
EasyForm.text('Name').required('Name is required')
```

## Required True

The `requiredTrue` validator is used to check if a control has a value of `true`.

Usage:

```typescript
EasyForm.text('Agreement')
  .requiredTrue('You must agree to the terms in order to continue')
```

## Min Length

The `minLength` validator is used to check if a control has a value of a minimum length greater than or equal to a specified value.

Usage:

```typescript
EasyForm.password('Password')
  .minLength(8, 'Password must be at least 8 characters long')
```

## Max Length

The `maxLength` validator is used to check if a control has a value of a maximum length less than or equal to a specified value.

Usage:

```typescript
EasyForm.password('Password')
  .maxLength(8, 'Password must be at most 8 characters long')
```

## Email

The `email` validator is used to check if a control has a value that matches the email pattern.

Usage:

```typescript
EasyForm.email('Email Address').email('Invalid email address')
```

## Pattern Match

The `pattern` validator is used to check if a control has a value that matches a specified pattern.

Usage:

```typescript
EasyForm.text('Phone').pattern(/^\d{10}$/, 'Invalid phone number')
```

## Min

The `min` validator is used to check if a control has a value that is greater than or equal to a specified value.

Usage:

```typescript
EasyForm.number('Quantity').min(1, 'Quantity must be at least 1')
```

## Max

The `max` validator is used to check if a control has a value that is less than or equal to a specified value.

Usage:

```typescript
EasyForm.number('Quantity').max(5, 'Quantity must be at most 5')
```

## Default



The `default` method is used to set a default value for a control.

Usage:

```typescript
EasyForm.text('Language').default('English')
```
> **Warning**
> **Note:** This method is not a validator.
