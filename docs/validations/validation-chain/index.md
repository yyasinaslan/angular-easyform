# {{ NgDocPage.title }}

When defining a field in `EasyForm` schema you can add multiple validations with chaining methods.

Example:

```typescript
import {EasyForm} from '@yyasinaslan/easyform';

@Component({
  /* ... */
})
export class MyComponent {
  form = EasyForm.create({
    name: EasyForm.text().required('Name is required')
      .minLength(3, 'Name must be at least 3 characters long')
      .maxLength(10, 'Name must be at most 10 characters long')
  })
}
```
