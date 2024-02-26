import {Directive, inject, Input, OnChanges, SimpleChanges, ViewContainerRef} from '@angular/core';
import {FormControl} from "@angular/forms";

@Directive({
  selector: 'ng-container[easyFormField]',
  standalone: true,
  exportAs: 'easyFormField'
})
export class FormFieldDirective implements OnChanges {

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
