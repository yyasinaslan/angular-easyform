import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  QueryList
} from '@angular/core';
import {EASY_FORM_CONFIG} from "../tokens/easy-form-config";
import {FormFieldDirective} from "../directives/form-field.directive";
import {EasyForm} from "../easy-form";
import {EfTextComponent} from "../controls/ef-text/ef-text.component";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EfCheckboxComponent} from "../controls/ef-checkbox/ef-checkbox.component";
import {EfSelectComponent} from "../controls/ef-select/ef-select.component";
import {EfRadioComponent} from "../controls/ef-radio/ef-radio.component";
import {EfTextAreaComponent} from "../controls/ef-textarea/ef-textarea.component";

@Component({
  selector: 'easy-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './easy-form.component.html',
  styleUrl: './easy-form.component.scss',
  host: {
    '[class]': `'show-errors-' + form.options.showErrors`
  }
})
export class EasyFormComponent implements AfterContentInit {
  @ContentChildren(FormFieldDirective, {descendants: true}) fields!: QueryList<FormFieldDirective>;

  elementRef = inject<ElementRef<HTMLDivElement>>(ElementRef);
  formConfig = inject(EASY_FORM_CONFIG, {optional: true});

  @Input({required: true}) form!: EasyForm;
  @Input() focusFirstError = true;

  @Output() submit = new EventEmitter<FormGroup>();

  constructor() {
    if (!this.formConfig) {
      this.loadDefaultConfig();
    }
  }

  ngAfterContentInit(): void {

  }

  getComponent(type: string) {
    return this.formConfig?.controls.find(control => control.name === type)?.component;
  }

  handleSubmit($event: any) {
    if (this.form.invalid && this.focusFirstError && this.elementRef) {
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
    this.submit.emit(this.form.formGroup)
  }

  private loadDefaultConfig() {
    this.formConfig = {
      validators: [],
      controls: [
        {name: 'text', component: EfTextComponent},
        {name: 'textarea', component: EfTextAreaComponent},
        {name: 'select', component: EfSelectComponent},
        {name: 'checkbox', component: EfCheckboxComponent},
        {name: 'radio', component: EfRadioComponent},
      ]
    }
  }
}
