# Warning

This project is under development and not ready for production. Please do not use it in production.

# EasyForm (Angular)

Angular Easy Form is a library that helps you to create forms in Angular with ease. It provides a set of
directives and components that help you to create forms with minimal code and focusing on layout and schema.

## Installation

```bash
npm i @yyasinaslan/easyform
```

[Documentation](https://ng-easy-form.netlify.app/).

## Basic Usage

```html

<easy-form [schema]="schema" (submit)="onSubmit($event)">

  <ng-container easyFormField path="firstName"/>

  <ng-container easyFormField path="lastName"/>
  
</easy-form>
```

```typescript
import {EasyForm} from "./easy-form";

@Component({...})
export class AppComponent {
  schema = EasyForm.create({
    firstName: EasyForm.text('First Name')
      .required('First name is required')
      .minLength(3, 'First name must be at least 3 characters'),
    lastName: EasyForm.text('Last Name').required('Last name is required')
  })

  onSubmit(value: any) {
    console.log(value)
  }
}
```
