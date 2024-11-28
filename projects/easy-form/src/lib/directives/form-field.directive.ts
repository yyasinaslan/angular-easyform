import {
  ComponentRef,
  DestroyRef,
  Directive,
  EventEmitter,
  inject,
  Injector,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {EasyFormComponent} from "../easy-form/easy-form.component";
import {EasyFormControl} from "../easy-form-control";
import {isComponent} from "../helpers/component-helper";
import {EasyFormControlComponent, LazyLoadingComponent} from "../tokens/easy-form-config";
import {filter, Observable, Subscription} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {EasyFormField} from "../easy-form-field";

/**
 * This directive responsible for rendering form fields dynamically in place of ng-container
 *
 * @input path: Array<string | number> - Path of the form control
 * @input disabled: boolean - Disable the form control
 * @input props: Record<string, any> - Properties to pass to the form control
 *
 * @output change: any - Emits control value changes
 *
 * In order to use these events below you need to bind them to input element with bindEvents directive
 * or emit them manually from the component
 *
 * @output fieldEvent: Event - Emit all events
 * @output focus: FocusEvent - Emit focus events
 * @output blur: FocusEvent - Emit blur events
 * @output input: InputEvent - Emit input events
 * @output keyup: KeyboardEvent - Emit keyup events
 * @output keydown: KeyboardEvent - Emit keydown events
 */
@Directive({
  selector: 'ng-container[easyFormField]',
  standalone: true,
  exportAs: 'easyFormField',
})
export class FormFieldDirective implements OnChanges {
  destroyRef = inject(DestroyRef)
  viewContainerRef = inject(ViewContainerRef)
  easyFormComponent = inject(EasyFormComponent)

  @Input() disabled = false;
  @Input() props?: Record<string, any>;
  // It emits control value changes
  @Output() change = new EventEmitter<any>();
  // Emit all events
  @Output() fieldEvent = new EventEmitter<Event>();
  // Filter events
  @Output("focus") focus = this.fieldEvent.pipe(filter(e => e.type == 'focus' || e.type == 'focusin')) as Observable<FocusEvent>;
  @Output("blur") blur = this.fieldEvent.pipe(filter(e => e.type == 'blur' || e.type == 'focusout')) as Observable<FocusEvent>;
  // Event emitters derived from fieldEvent
  @Output("input") input = this.fieldEvent.pipe(filter(e => e.type == 'input')) as Observable<InputEvent>;
  @Output("keyup") keyup = this.fieldEvent.pipe(filter(e => e.type == 'keyup')) as Observable<KeyboardEvent>;
  @Output("keydown") keydown = this.fieldEvent.pipe(filter(e => e.type == 'keydown')) as Observable<KeyboardEvent>;

  public instance?: EasyFormControl;

  @Input({
    required: true,
    transform: (val: string | Array<string | number>): Array<string | number> => {
      const path = val;
      if (typeof path === 'string') {
        return path.split('.');
      }
      return path;
    }
  }) path!: Array<string | number>;

  control?: FormControl;

  private componentRef?: ComponentRef<EasyFormControl>;
  private valueChangeSubscription?: Subscription;

  get value() {
    return this.control?.value;
  }

  private get form() {
    return this.easyFormComponent.schema;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['path']) {
      this.pathChanged();
    }

    if (changes['disabled']) {
      const control = this.control;
      if (control) {
        if (this.disabled) {
          control.disable();
        } else {
          control.enable();
        }
      }
    }

    // Apply props changes to component
    if (changes['props'] && this.componentRef) {
      const prevProps = this.componentRef.instance.props(); // Dont lose previous props
      this.componentRef.instance.props.set({...prevProps, ...changes['props'].currentValue});
    }
  }

  private pathChanged() {
    const control = this.setControl();
    if (control) {
      if (this.valueChangeSubscription) {
        this.valueChangeSubscription.unsubscribe();
      }
      this.control = control;
      this.valueChangeSubscription = control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
        this.change.emit(value);
      });

      this.render();
    }
  }

  private setControl() {
    const path = this.path;
    if (!path || path.length === 0) {
      return;
    }

    if (!this.easyFormComponent.schema) {
      return undefined;
    }

    const control = this.easyFormComponent.schema.getControl(path);

    if (!control) {
      return undefined;
    }
    return control as FormControl;
  }

  private async render() {
    await this._render();

    const control = this.control;
    if (control) {
      setTimeout(() => {
        if (this.disabled) {
          control.disable();
        } else {
          control.enable();
        }
      })
    }
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
    // Forwards this instance to the child component
    const injector = Injector.create({
      parent: this.viewContainerRef.injector,
      providers: [
        {
          provide: FormFieldDirective,
          useValue: this
        }
      ]
    })
    this.viewContainerRef.clear();

    if (this.componentRef) {
      this.componentRef.destroy();
    }

    const componentRef = this.viewContainerRef.createComponent<EasyFormControl>(component as EasyFormControlComponent, {
      injector: injector
    });
    this.componentRef = componentRef;
    this.instance = componentRef.instance;

    // Set initial props
    if (schema.props) {
      this.componentRef.instance.props.set(schema.props);
    }

    // Set component specific properties
    if (this.props) {
      const prevProps = this.componentRef.instance.props();
      this.componentRef.instance.props.set({...prevProps, ...this.props});
    }

    componentRef.instance.easyFormControl.set({
      id: path.join('_') + '_' + Math.random().toString(36).substring(2),
      control: this.control!,
      schema: schema as EasyFormField
    });

    componentRef.changeDetectorRef.detectChanges();
  }

}
