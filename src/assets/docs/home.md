# Angular Easy Form Documentation

## Introduction

This angular library is designed to make form creation and validation easier.
It is built on top of Angular Reactive Forms and provides
a simple and easy to use API for creating forms and form fields.

You can add your custom form field components and use them in your forms. See [configuration](docs/configuration)

## Quick Start

```bash
npm i @yyasinaslan/easyform
```

## Usage

In component class

```typescript
// login.component.ts
import {Component} from '@angular/core';
import {EasyForm, EasyFormComponent, FormFieldDirective} from "easy-form";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    EasyFormComponent,
    FormFieldDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form = EasyForm.create({
    email: EasyForm.email('Email').required('Email is required').email('Email is not valid'),
    password: EasyForm.password('Password').required('Password is required'),
    rememberMe: EasyForm.checkbox('Remember me')
  });
}
```

In component template

```html
<!-- login.component.html -->
<easy-form [form]="form">
  <div class="container mx-auto max-w-2xl space-y-5 py-10 px-2">
    <div class="card space-y-6">
      <h1 class="text-lg">Login Page</h1>
      <ng-container easyFormField path="email"/>
      <ng-container easyFormField path="password"/>
      <div>
        <ng-container easyFormField path="rememberMe"/>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </div>
  </div>
</easy-form>
```
