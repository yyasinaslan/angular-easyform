import {AfterContentInit, Component, ElementRef, EventEmitter, inject, Input, Output} from '@angular/core';
import {EASY_FORM_CONFIG, EasyFormConfig} from "../tokens/easy-form-config";
import {EasyForm} from "../easy-form";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EfTextAreaComponent} from "../controls/ef-textarea/ef-textarea.component";
import {EfSelectComponent} from "../controls/ef-select/ef-select.component";
import {EfCheckboxComponent} from "../controls/ef-checkbox/ef-checkbox.component";
import {EfRadioComponent} from "../controls/ef-radio/ef-radio.component";
import {EfSwitchComponent} from "../controls/ef-switch/ef-switch.component";
import {EfTextComponent} from "../controls/ef-text/ef-text.component";

/**
 * EasyFormComponent is the main component that is used to create forms
 *
 * @see `EasyForm`
 */
@Component({
  selector: 'easy-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './easy-form.component.html',
  host: {
    '[class]': `'show-errors-' + schema.options.showErrors`
  }
})
export class EasyFormComponent implements AfterContentInit {
  elementRef = inject<ElementRef<HTMLDivElement>>(ElementRef);
  _formConfig = inject(EASY_FORM_CONFIG, {optional: true});

  formConfig: EasyFormConfig = this.defaultConfig();

  /**
   * EasyForm instance
   *
   * @type `EasyForm`
   */
  @Input({required: true}) schema!: EasyForm;

  /**
   * Focus first input with error
   */
  @Input() focusFirstError = true;

  /**
   * Submit event output
   */
  @Output() efSubmit = new EventEmitter<FormGroup>();

  constructor() {
    if (this._formConfig) {
      Object.assign(this.formConfig.controls, this._formConfig.controls);
    }
  }

  ngAfterContentInit(): void {

  }

  getComponentType(type: string) {
    return this.formConfig.controls[type];
  }

  handleSubmit($event: any) {
    if (this.schema.invalid && this.focusFirstError && this.elementRef) {
      const firstError = this.elementRef.nativeElement.querySelector('.ng-invalid:not(form), ef-errors:has(*)');
      if (firstError) {
        setTimeout(() => {
          if (firstError.tagName == 'EF-ERRORS') {
            firstError.scrollIntoView({behavior: 'smooth', block: 'center'})
          } else {
            (firstError as HTMLElement).focus()
          }
        }, 100)
      }
    }
    this.efSubmit.emit(this.schema.formGroup)
  }

  private defaultConfig() {
    return {
      controls: {
        text: EfTextComponent,
        textarea: EfTextAreaComponent,
        select: EfSelectComponent,
        checkbox: EfCheckboxComponent,
        radio: EfRadioComponent,
        switch: EfSwitchComponent
      }
    }
  }
}
