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
import {isComponent} from "../helpers/component-helper";
import {EasyFormControlComponent, LazyLoadingComponent} from "../tokens/easy-form-config";

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

  @Output() fieldEvent = new EventEmitter<Event>();

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
      this.componentRef.instance.props.set(changes['props'].currentValue);
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  async render() {
    await this._render();

    if (this.control) {
      setTimeout(() => {
        if (this.disabled) {
          this.control!.disable();
        } else {
          this.control!.enable();
        }
      })
    }
  }

  ngAfterContentInit(): void {
    this.render();

    // Subscribe to value changes and emit change event
    this.control?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
      this.change.emit(value);
    })
  }

  private async _render() {
    const path = this.path;
    if (!path) {
      return;
    }
    const schema = this.form.getSchema(path);
    if (!schema) {
      throw new Error(`Path not found for ${path}`);
    }
    let componentDefinition = typeof schema.controlType === 'string' ? this.form.getComponentType(schema.controlType) : schema.controlType;
    let component: EasyFormControlComponent;
    if (!componentDefinition) {
      // Get component from formConfig
      componentDefinition = this.easyFormComponent.getComponentType(schema.controlType as string);
    }

    if (!componentDefinition) {
      throw new Error(`Component configuration not found for ${schema.controlType}`);
    }

    if (!isComponent(componentDefinition)) {
      // Assume this is lazy loading component
      if (typeof componentDefinition !== 'function') {
        throw new Error(`${schema.controlType} is not a valid Angular component`);
      }
      const lazyLoadingComponent = componentDefinition as LazyLoadingComponent;
      const loaded = await lazyLoadingComponent() as any;
      if (loaded.default) {
        component = loaded.default;
      } else if (typeof loaded === 'function' && isComponent(loaded)) {
        component = loaded as EasyFormControlComponent;
      } else {
        throw new Error(`${schema.controlType} has no default export or is not a valid Angular component`);
      }
    } else {
      component = componentDefinition as EasyFormControlComponent;
    }

    // Double check if component is a valid Angular component
    if (!isComponent(component)) {
      throw new Error(`${schema.controlType} is not a valid Angular component. Please provide a valid Angular component for ${schema.controlType} on provider EasyFormConfig`);
    }
    //
    const componentRef = this.viewContainerRef.createComponent<EasyFormControl>(component as EasyFormControlComponent, {});
    this.componentRef = componentRef;
    this.instance = componentRef.instance;
    //
    const control = this.form.formGroup.get(path);
    if (!control) {
      throw new Error(`FormControl not found for ${path}`);
    }
    this.control = control as FormControl;

    if (schema.props) {
      // Initialize props
      this.instance.props.set(schema.props);
    }

    componentRef.instance.easyFormControl.set({
      id: (typeof path === 'string' ? path : path.join('_')) + '_' + Math.random().toString(36).substring(2),
      control: this.control!,
      schema: schema,
      formFieldDirective: this
    });

    componentRef.changeDetectorRef.detectChanges();
  }
}
