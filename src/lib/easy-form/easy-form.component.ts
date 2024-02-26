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
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {EasyFormControl} from "../easy-form-control";
import {EfSelectComponent} from "../controls/ef-select/ef-select.component";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

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
    this.render();
    this.fields.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(fields => {
      this.render();
    });
  }

  render() {
    this.fields.forEach(field => {
      const viewContainerRef = field.viewContainerRef;
      // Only create component if it doesn't exist
      if (viewContainerRef.get(0)) {
        return;
      }

      const name = field.name;
      const schema = this.form.getSchema(name);
      if (!schema) {
        throw new Error(`Schema not found for ${name}`);
      }
      let component = typeof schema.controlType === 'string' ? this.form.getComponent(schema.controlType) : schema.controlType;
      if (!component) {
        // Get component from formConfig
        component = this.getComponent(schema.controlType as string);
      }

      if (!component) {
        throw new Error(`Component configuration not found for ${schema.controlType}`);
      }

      const componentRef = viewContainerRef.createComponent<EasyFormControl>(component);

      const formControl = this.form.getControl(name);
      if (formControl) {
        componentRef.instance.control = formControl;
        field.control = formControl;
      }
      if (schema.props) {
        componentRef.instance.props = schema.props;
      }

      componentRef.instance.formField = schema;

      componentRef.changeDetectorRef.detectChanges();
    });
  }

  private renderFormGroup(){

  }

  private loadDefaultConfig() {
    this.formConfig = {
      validators: [],
      controls: [
        {name: 'text', component: EfTextComponent},
        {name: 'select', component: EfSelectComponent},
      ]
    }
  }

  getComponent(type: string) {
    return this.formConfig?.controls.find(control => control.name === type)?.component;
  }

  protected readonly onsubmit = onsubmit;
}
