import {
  AfterContentInit,
  ComponentRef,
  DestroyRef,
  Directive,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {EasyFormComponent} from "../easy-form/easy-form.component";
import {EasyFormControl} from "../easy-form-control";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Directive({
  selector: 'ng-container[easyFormField]',
  standalone: true,
  exportAs: 'easyFormField'
})
export class FormFieldDirective implements OnChanges, AfterContentInit {
  destroyRef = inject(DestroyRef)
  viewContainerRef = inject(ViewContainerRef)
  easyFormComponent = inject(EasyFormComponent)

  control?: FormControl;

  @Input() path?: string | Array<string | number>;
  @Input() disabled = false;
  @Input() props?: Record<string, any>;

  @Output() change = new EventEmitter<any>();

  public instance?: EasyFormControl;
  private componentRef?: ComponentRef<EasyFormControl>;

  get value() {
    return this.control?.value;
  }

  private get form() {
    return this.easyFormComponent.form;
  }

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

    if (changes['props'] && this.componentRef) {
      this.componentRef.instance.props = this.props;
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  render() {
    this._render();
  }

  ngAfterContentInit(): void {
    this.render();

    // Subscribe to value changes and emit change event
    this.control?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
      this.change.emit(value);
    })
  }

  private _render() {
    const path = this.path;
    if (!path) {
      return;
    }
    const schema = this.form.getSchema(path);
    if (!schema) {
      throw new Error(`Path not found for ${path}`);
    }
    let component = typeof schema.controlType === 'string' ? this.form.getComponent(schema.controlType) : schema.controlType;
    if (!component) {
      // Get component from formConfig
      component = this.easyFormComponent.getComponent(schema.controlType as string);
    }

    if (!component) {
      throw new Error(`Component configuration not found for ${schema.controlType}`);
    }

    // console.log('component', component)

    try {
      const componentRef = this.viewContainerRef.createComponent<EasyFormControl>(component, {});
      this.componentRef = componentRef;
      this.instance = componentRef.instance;

      const control = this.form.formGroup.get(path);
      if (control) {
        this.control = control as FormControl;
        componentRef.instance.control = control as FormControl;
      }

      if (schema.props) {
        componentRef.instance.props = schema.props;
      }

      componentRef.instance.formField = schema;

      componentRef.changeDetectorRef.detectChanges();
    } catch (e) {
      console.error(e);
    }
  }
}
