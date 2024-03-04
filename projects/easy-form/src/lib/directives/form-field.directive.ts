import {
  AfterContentInit,
  ComponentRef,
  Directive,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {EasyFormComponent} from "../easy-form/easy-form.component";
import {EasyFormControl} from "../easy-form-control";

@Directive({
  selector: 'ng-container[easyFormField]',
  standalone: true,
  exportAs: 'easyFormField'
})
export class FormFieldDirective implements OnChanges, AfterContentInit {
  viewContainerRef = inject(ViewContainerRef)
  easyFormComponent = inject(EasyFormComponent)

  control?: FormControl;

  @Input() path?: string | Array<string | number>;
  @Input() disabled = false;
  @Input() props?: Record<string, any>;
  public instance?: EasyFormControl;
  private componentRef?: ComponentRef<EasyFormControl>;
  private _renderTimeout: any;

  constructor() {

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
    // clearTimeout(this._renderTimeout);
    // this._renderTimeout = setTimeout(() => {
    //   this._render();
    // }, 10);
  }

  ngAfterContentInit(): void {
    this.render();
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
