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
import {EasyForm} from "../easy-form";
import {EfTextComponent} from "../controls/ef-text/ef-text.component";
import {FormFieldDirective} from "../directives/form-field.directive";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EfCheckboxComponent} from "../controls/ef-checkbox/ef-checkbox.component";
import {EfSelectComponent} from "../controls/ef-select/ef-select.component";

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
  protected readonly onsubmit = onsubmit;

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
      console.log('firstError', firstError)
      if (firstError) {
        setTimeout(() => {
          if (firstError.tagName == 'EF-SELECT') {
            firstError.scrollIntoView({behavior: 'smooth', block: 'center'})
          } else {
            (firstError as HTMLElement).scrollIntoView({behavior: 'smooth', block: 'center'});
            (firstError as HTMLElement).focus()
          }
        }, 100)
      }
    }
    console.log($event)
    this.submit.emit(this.form.formGroup)
  }

  private renderFormGroup() {

  }

  private loadDefaultConfig() {
    this.formConfig = {
      validators: [],
      controls: [
        {name: 'text', component: EfTextComponent},
        {name: 'select', component: EfSelectComponent},
        {name: 'checkbox', component: EfCheckboxComponent},
      ]
    }
  }
}
