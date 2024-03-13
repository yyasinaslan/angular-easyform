import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EventsExampleComponent} from "@demos/events-example/events-example.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EventsExampleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dev-demo';
}
