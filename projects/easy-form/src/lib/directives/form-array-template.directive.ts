import {Directive, inject, TemplateRef} from '@angular/core';

@Directive({
  selector: 'ng-template[formArrayTemplate]',
  standalone: true,
  exportAs: 'easyFormArray'
})
export class FormArrayTemplateDirective {
  public templateRef = inject(TemplateRef);

  static ngTemplateContextGuard<T>(dir: FormArrayTemplateDirective, ctx: any): ctx is {
    $implicit: any,
    index: number
  } {
    return true;
  }

}
