import {
  AfterContentInit,
  Directive,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {EasyFormComponent} from "../easy-form/easy-form.component";
import {EfFormArrayComponent} from "../components/ef-form-array/ef-form-array.component";
import {EasyFormControl} from "../easy-form-control";

@Directive({
  selector: 'ng-container[easyFormField]',
  standalone: true,
  exportAs: 'easyFormField'
})
export class FormFieldDirective implements OnChanges, OnInit, AfterContentInit {

  // @ViewChild()

  viewContainerRef = inject(ViewContainerRef)
  easyFormComponent = inject(EasyFormComponent)
  easyFormArray = inject(EfFormArrayComponent, {optional: true})

  control?: FormControl;

  @Input() path?: string | Array<string | number>;
  @Input() disabled = false;

  constructor() {

  }

  private get form() {
    return this.easyFormComponent.form;
  }

  ngOnInit() {

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
  }

  render() {
    const path = this.path;
    if (!path) {
      // todo: array item render
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

    const componentRef = this.viewContainerRef.createComponent<EasyFormControl>(component);

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
  }

  ngAfterContentInit(): void {
    this.render();
  }


}
