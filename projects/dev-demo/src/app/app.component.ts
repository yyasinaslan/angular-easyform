import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EventsExampleComponent} from "@demos/events-example/events-example.component";
import {ThemeSwitcherComponent} from "./theme-switcher/theme-switcher.component";
import {DynamicPathDemoComponent} from "@demos/dynamic-path-demo/dynamic-path-demo.component";
import {AlternativeSchemaComponent} from "@app/alternative-schema/alternative-schema.component";
import {CustomFormExampleComponent} from "./custom-form-example/custom-form-example.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EventsExampleComponent, ThemeSwitcherComponent, DynamicPathDemoComponent, AlternativeSchemaComponent, CustomFormExampleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dev-demo';
}
