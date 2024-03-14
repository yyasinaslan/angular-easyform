import {Directive, EventEmitter, HostListener, inject} from '@angular/core';
import {FormFieldDirective} from "./form-field.directive";

/**
 * Bind events to input, textarea, select elements and emit events to the parent form field directive
 */
@Directive({
  selector: 'input[bindEvents], textarea[bindEvents], select[bindEvents]',
  standalone: true
})
export class BindEventsDirective {
  formFieldDirective = inject(FormFieldDirective, {skipSelf: true});

  @HostListener('input', ['$event']) onInput(event: Event) {
    this.emitEvent(event);
  }

  @HostListener('focus', ['$event']) onFocus(event: Event) {
    this.emitEvent(event);
  }

  @HostListener('blur', ['$event']) onBlur(event: Event) {
    this.emitEvent(event);
  }

  @HostListener('keyup', ['$event']) onKeyup(event: Event) {
    this.emitEvent(event);
  }

  @HostListener('keydown', ['$event']) onKeydown(event: Event) {
    this.emitEvent(event);
  }

  emitEvent = (event: Event) => {
    const directive = this.formFieldDirective;
    if (directive.fieldEvent && directive.fieldEvent instanceof EventEmitter) {
      // Check if there are any subscribers to the event
      if (directive.fieldEvent.observed) {
        directive.fieldEvent.emit(event);
      }
    }
  }

}
