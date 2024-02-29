import {Component, ContentChild, inject, Input, TemplateRef} from '@angular/core';
import {EasyFormComponent} from "../../easy-form/easy-form.component";
import {NgTemplateOutlet} from "@angular/common";
import {FormArray} from "@angular/forms";
import {FormArrayTemplateDirective} from "../../directives/form-array-template.directive";

@Component({
  selector: 'ef-form-array',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './ef-form-array.component.html',
  styleUrl: './ef-form-array.component.scss'
})
export class EfFormArrayComponent {
  @ContentChild(FormArrayTemplateDirective, {read: TemplateRef}) arrayTemplate!: TemplateRef<{
    $implicit: any,
    index: number
  }>;

  @Input({required: true}) path!: string;

  easyFormComponent = inject(EasyFormComponent)

  get arrayControls() {
    const arr = this.easyFormComponent.form.formGroup.get(this.path) as FormArray;
    return arr.controls ?? [];
  }
}
