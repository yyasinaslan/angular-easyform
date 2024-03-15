# {{ NgDocPage.title }}

Custom validators can be added same as built-in validators. The only difference is that custom validators are provided by user.

## Example

Define a custom validator function and use it in the form definition.

```typescript
private passwordMatcher = (otherPasswordPath: string): ValidatorFn => {
    return (control) => {
      const otherPasswordValue = this.form.getValue(otherPasswordPath);
      if (control.value !== otherPasswordValue) {
        return {passwordMatchError: true};
      }
      return null;
    }
  };
```

Use it in schema

```typescript
password: EasyForm.password('Password').required('Password is required').minLength(6, 'Password must be at least 6 characters'),
passwordConfirm: EasyForm.password('Password Confirm')
  .customValidator(this.passwordMatcher('password'), {
      passwordMatchError: 'Password does not match'
    })
```

### Full Example

```typescript
import {Component} from '@angular/core';
import {EasyForm} from "@yyasinaslan/easyform";
import {ValidatorFn} from "@angular/forms";

@Component({
  /* ... */
})
export class MyComponent {

  private passwordMatcher = (otherPasswordPath: string): ValidatorFn => {
    return (control) => {
      const otherPasswordValue = this.form.getValue(otherPasswordPath);
      if (control.value !== otherPasswordValue) {
        return {passwordMatchError: true};
      }
      return null;
    }
  };

  form = EasyForm.create({
    username: EasyForm.text('Name').customValidator(this.requiredCustom('name'), {
      required: 'Name is required'
    }),
    password: EasyForm.password('Password').required('Password is required').minLength(6, 'Password must be at least 6 characters'),
    passwordConfirm: EasyForm.password('Password Confirm')
      .customValidator(this.passwordMatcher('password'), {
        passwordMatchError: 'Password does not match'
      }),
  })
}

```
