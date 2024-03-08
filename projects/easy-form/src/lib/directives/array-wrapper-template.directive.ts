import {Directive, inject, TemplateRef} from '@angular/core';

@Directive({
  selector: 'ng-template[arrayWrapper]',
  standalone: true,
  exportAs: 'arrayWrapper'
})
export class ArrayWrapperTemplateDirective {
  public templateRef = inject(TemplateRef);

  static ngTemplateContextGuard<T>(dir: ArrayWrapperTemplateDirective, ctx: any): ctx is {
    $implicit: any,
    itemTemplate: TemplateRef<any>
  } {
    return true;
  }

}
