import {Component, ContentChild, inject, Input, TemplateRef} from '@angular/core';
import {EasyFormComponent} from "../../easy-form/easy-form.component";
import {NgTemplateOutlet} from "@angular/common";
import {FormArray} from "@angular/forms";

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
  @ContentChild('arrayTemplate', {read: TemplateRef}) arrayTemplate!: TemplateRef<any>;

  @Input({required: true}) path!: string;

  easyFormComponent = inject(EasyFormComponent)

  get arrayControls() {
    const arr = this.easyFormComponent.form.formGroup.get(this.path) as FormArray;
    return arr.controls;
  }
}
