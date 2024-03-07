import {Directive, inject, TemplateRef} from '@angular/core';

@Directive({
  selector: 'ng-template[arrayItem]',
  standalone: true,
  exportAs: 'arrayItem'
})
export class ArrayItemTemplateDirective {
  public templateRef = inject(TemplateRef);

  static ngTemplateContextGuard<T>(dir: ArrayItemTemplateDirective, ctx: any): ctx is {
    $implicit: any,
    index: number
  } {
    return true;
  }

}
