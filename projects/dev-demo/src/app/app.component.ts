import {Component} from '@angular/core';
import {EventsExampleComponent} from "@demos/events-example/events-example.component";
import {ThemeSwitcherComponent} from "./theme-switcher/theme-switcher.component";
import {DynamicPathDemoComponent} from "@demos/dynamic-path-demo/dynamic-path-demo.component";
import {AlternativeSchemaComponent} from "@app/alternative-schema/alternative-schema.component";
import {CustomFormExampleComponent} from "./custom-form-example/custom-form-example.component";
import {PropBindingComponent} from "./prop-binding/prop-binding.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EventsExampleComponent, ThemeSwitcherComponent, DynamicPathDemoComponent, AlternativeSchemaComponent, CustomFormExampleComponent, PropBindingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dev-demo';
}
