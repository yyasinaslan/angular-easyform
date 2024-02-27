import {
  ContentChild,
  Directive,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {FormControl} from "@angular/forms";

@Directive({
  selector: 'ng-container[easyFormArray]',
  standalone: true,
  exportAs: 'easyFormArray'
})
export class FormArrayDirective implements OnChanges {
  @ContentChild('arrayTemplate', {read: TemplateRef}) arrayTemplate!: TemplateRef<any>;

  viewContainerRef = inject(ViewContainerRef)

  control?: FormControl;

  @Input({required: true}) name!: string;
  @Input() groupName?: string;
  @Input() arrayName?: string;
  @Input() disabled = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      if (this.control) {
        if (this.disabled) {
          this.control.disable();
        } else {
          this.control.enable();
        }
      }
    }
  }


}
