import {Component, ContentChild, inject, Input, TemplateRef} from '@angular/core';
import {EasyFormComponent} from "../../easy-form/easy-form.component";
import {NgTemplateOutlet} from "@angular/common";
import {FormArray} from "@angular/forms";
import {ArrayItemTemplateDirective} from "../../directives/array-item-template.directive";
import {FormErrorsComponent} from "../form-errors/form-errors.component";
import {ArrayWrapperTemplateDirective} from "../../directives/array-wrapper-template.directive";

@Component({
  selector: 'ef-form-array',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    FormErrorsComponent
  ],
  templateUrl: './ef-form-array.component.html',
  styleUrl: './ef-form-array.component.scss'
})
export class EfFormArrayComponent {
  @ContentChild(ArrayItemTemplateDirective, {read: TemplateRef}) itemTemplate!: TemplateRef<{
    $implicit: any,
    index: number
  }>;

  @ContentChild(ArrayWrapperTemplateDirective, {read: TemplateRef}) wrapperTemplate!: TemplateRef<{
    $implicit: any,
    itemTemplate: TemplateRef<any>
  }>;

  @Input({required: true}) path!: string;

  easyFormComponent = inject(EasyFormComponent)

  get schema() {
    return this.easyFormComponent.form.getSchema(this.path);
  }

  get control() {
    return this.easyFormComponent.form.getControl(this.path);
  }

  get arrayControls() {
    const arr = this.easyFormComponent.form.formGroup.get(this.path) as FormArray;
    return arr.controls ?? [];
  }
}
