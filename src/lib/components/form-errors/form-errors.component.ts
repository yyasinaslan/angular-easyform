import {Component, ContentChild, Input, TemplateRef} from '@angular/core';
import {FormField} from "../../interfaces/form-field";
import {FormControl} from "@angular/forms";
import {JsonPipe, KeyValuePipe, NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'ef-errors',
  standalone: true,
  imports: [
    KeyValuePipe,
    JsonPipe,
    NgTemplateOutlet
  ],
  templateUrl: './form-errors.component.html',
  styleUrl: './form-errors.component.scss'
})
export class FormErrorsComponent {
  @ContentChild('messageTemplate', {read: TemplateRef}) messageTemplate?: TemplateRef<{$implicit: string}>;

  @Input({required: true}) control!: FormControl;
  @Input({required: true}) formField!: FormField;
}
