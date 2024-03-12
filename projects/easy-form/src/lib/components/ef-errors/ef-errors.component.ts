import {Component, ContentChild, Input, TemplateRef} from '@angular/core';
import {FormControl} from "@angular/forms";
import {FormField} from "../../interfaces/form-field";
import {KeyValuePipe, NgTemplateOutlet} from "@angular/common";
import {ObservePipe} from "../../pipes/observe";
import {EasyForm} from "../../easy-form";

@Component({
  selector: 'ef-errors',
  standalone: true,
  imports: [
    ObservePipe,
    NgTemplateOutlet,
    KeyValuePipe
  ],
  templateUrl: './ef-errors.component.html',
  styleUrl: './ef-errors.component.scss'
})
export class EfErrorsComponent {
  @ContentChild('messageTemplate', {read: TemplateRef}) messageTemplate?: TemplateRef<{ $implicit: string }>;

  @Input() form?: EasyForm;
  @Input() path?: string | (number | string)[];

  get _control() {
    if (this.control) return this.control;
    if (!this.path || !this.form) throw new Error('Path and form inputs are required');
    return this.form.getControl(this.path);
  }

  get _formField() {
    if (this.formField) return this.formField;
    if (!this.path || !this.form) throw new Error('Path and form inputs are required');
    return this.form.getSchema(this.path);
  }

  @Input() control?: FormControl;
  @Input() formField?: FormField;

}
