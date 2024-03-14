import {
  ComponentRef,
  computed,
  DestroyRef,
  Directive,
  effect,
  EventEmitter,
  inject,
  Injector,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
  untracked,
  ViewContainerRef
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {EasyFormComponent} from "../easy-form/easy-form.component";
import {EasyFormControl} from "../easy-form-control";
import {isComponent} from "../helpers/component-helper";
import {EasyFormControlComponent, LazyLoadingComponent} from "../tokens/easy-form-config";
import {filter, Subscription} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Directive({
  selector: 'ng-container[easyFormField]',
  standalone: true,
  exportAs: 'easyFormField'
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
  @Output("focus") focus = this.fieldEvent.pipe(filter(e => e.type == 'focus' || e.type == 'focusin'));
  @Output("blur") blur = this.fieldEvent.pipe(filter(e => e.type == 'blur' || e.type == 'focusout'));
  // Event emitters derived from fieldEvent
  @Output("input") input = this.fieldEvent.pipe(filter(e => e.type == 'input'));
  @Output("keyup") keyup = this.fieldEvent.pipe(filter(e => e.type == 'keyup'));
  @Output("keydown") keydown = this.fieldEvent.pipe(filter(e => e.type == 'keydown'));
  public instance?: EasyFormControl;
  private componentRef?: ComponentRef<EasyFormControl>;

  private valueChangeSubscription?: Subscription;

  constructor() {
    effect(() => {
      // track control changes
      const control = this.control();
      if (this.valueChangeSubscription) {
        this.valueChangeSubscription.unsubscribe();
      }
      untracked(() => {
        if (control) {
          this.valueChangeSubscription = control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
            this.change.emit(value);
          });
          this.render();
        }
      })
    });
  }

  get value() {
    return this.control()?.value;
  }

  private _path = signal<Array<string | number>>([]);

  control = computed(() => {
    const path = this._path();
    if (!path || path.length === 0) {
      return;
    }
    const control = this.easyFormComponent.form.formGroup.get(this._path());
    if (!control) {
      throw new Error(`Form definition not found for ${this._path()}`);
    }
    return control as FormControl;
  });

  // This will be useful for dynamic path changes
  @Input() set path(value: string | Array<string | number>) {
    let path: Array<string | number>;
    if (typeof value === 'string') {
      path = value.split('.');
    } else {
      path = value;
    }
    this._path.set(path);

    // setTimeout(() => {
    //   this._path.set(path);
    // }, 1000)
  }

  private get form() {
    return this.easyFormComponent.form;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      const control = this.control();
      if (control) {
        if (this.disabled) {
          control.disable();
        } else {
          control.enable();
        }
      }
    }

    if (changes['props'] && this.componentRef) {
      this.componentRef.instance.props.set(changes['props'].currentValue);
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  private async render() {
    await this._render();

    const control = this.control();
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
    const path = this._path();
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


    if (schema.props) {
      // Initialize props
      this.instance.props.set(schema.props);
    }

    if (this.props) {
      this.componentRef.instance.props.set(this.props);
    }

    componentRef.instance.easyFormControl.set({
      id: path.join('_') + '_' + Math.random().toString(36).substring(2),
      control: this.control()!,
      schema: schema
    });

    componentRef.changeDetectorRef.detectChanges();
  }
}
