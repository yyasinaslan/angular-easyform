import {Component, ContentChild, inject, Input, TemplateRef} from '@angular/core';
import {KeyValuePipe, NgTemplateOutlet} from "@angular/common";
import {EasyFormComponent} from "../../easy-form/easy-form.component";
import {FormControl} from "@angular/forms";
import {FormField} from "../../interfaces/form-field";
import {ObservableStringPipe} from "../../pipes/observable-string";

@Component({
  selector: 'ef-errors',
  standalone: true,
  imports: [
    KeyValuePipe,
    NgTemplateOutlet,
    ObservableStringPipe
  ],
  templateUrl: './form-errors.component.html',
  styleUrl: './form-errors.component.scss'
})
export class FormErrorsComponent {
  @ContentChild('messageTemplate', {read: TemplateRef}) messageTemplate?: TemplateRef<{ $implicit: string }>;

  easyFormComponent = inject(EasyFormComponent);
  @Input() path?: string | (number | string)[];

  get _control() {
    if (this.control) return this.control;
    if (!this.path) throw new Error('Path is required');
    return this.easyFormComponent.form.getControl(this.path);
  }

  get _formField() {
    if (this.formField) return this.formField;
    if (!this.path) throw new Error('Path is required');
    return this.easyFormComponent.form.getSchema(this.path);
  }

  @Input() control?: FormControl;
  @Input() formField?: FormField;
}
