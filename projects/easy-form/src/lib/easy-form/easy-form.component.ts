import {
  AfterContentInit,
  Component,
  ContentChildren,
  DestroyRef,
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
  destroyRef = inject(DestroyRef)

  @ContentChildren(FormFieldDirective, {descendants: true}) fields!: QueryList<FormFieldDirective>;

  formConfig = inject(EASY_FORM_CONFIG, {optional: true});

  @Input({required: true}) form!: EasyForm;

  @Output() submit = new EventEmitter<FormGroup>();

  constructor() {
    if (!this.formConfig) {
      this.loadDefaultConfig();
    }
  }

  ngAfterContentInit(): void {

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

  getComponent(type: string) {
    return this.formConfig?.controls.find(control => control.name === type)?.component;
  }

  protected readonly onsubmit = onsubmit;
}
