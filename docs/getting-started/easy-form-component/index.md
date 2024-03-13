# {{ NgDocPage.title }}

In order to render defined form we should use `EasyFormComponent` component.
Inside this component form layout is defined and form fields are rendered.

## Usage

You can see simple login form example below.

{{ NgDocActions.demo("LoginComponent", {expanded: true}) }}

## Properties

| Name                     | Type                      | Description                                        |
|--------------------------|---------------------------|----------------------------------------------------|
| `@Input` form            | `EasyForm`                | Form definition (Required)                         |
| `@Input` focusFirstError | `boolean`                 | Focus error when form submitted. (Default: `true`) |
| `@Output` submit         | `EventEmitter<FormGroup>` | Submit event                                       |
