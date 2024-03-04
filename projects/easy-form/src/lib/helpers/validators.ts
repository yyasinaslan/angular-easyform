import {ValidatorFn, Validators} from "@angular/forms";


export const efDefaultValidators: Record<string, (...args: any[]) => ValidatorFn> = {
  'required': () => Validators.required,
  'min': (value: number) => Validators.min(value),
  'max': (value: number) => Validators.max(value),
  'minLength': (value: number) => Validators.minLength(value),
  'maxLength': (value: number) => Validators.maxLength(value),
  'pattern': (value: string) => Validators.pattern(value),
  'email': () => Validators.email
}
