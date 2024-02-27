import {Component, effect, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {EasyFormComponent} from "../lib/easy-form/easy-form.component";
import {FormFieldComponent} from "../lib/components/form-field/form-field.component";
import {FormLabelDirective} from "../lib/directives/form-label.directive";
import {FormControlDirective} from "../lib/directives/form-control.directive";
import {FormErrorsComponent} from "../lib/components/form-errors/form-errors.component";
import {EasyForm} from "../lib/easy-form";
import {FormGroup, Validators} from "@angular/forms";
import {FormFieldDirective} from "../lib/directives/form-field.directive";
import {JsonPipe} from "@angular/common";
import {TextWithActionComponent} from "./text-with-action/text-with-action.component";
import {AdvancedControlTypes} from "../lib/interfaces/advanced-control-types";
import {FormArrayDirective} from "../lib/directives/form-array.directive";

function t(template: TemplateStringsArray, ...args: any[]) {
  console.log(template, args);
  return 'empty';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EasyFormComponent, FormFieldComponent, FormLabelDirective, FormControlDirective, FormErrorsComponent, FormFieldDirective, JsonPipe, FormArrayDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dynamic-form-2';

}
