import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {JsonPipe} from "@angular/common";
import {routes} from "./app.routes";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dynamic-form-2';

  theme = localStorage.getItem('theme') || 'dark';
  protected readonly routes = routes;

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark', this.theme === 'dark');
    localStorage.setItem('theme', this.theme);
  }

  ngOnInit() {
    document.body.classList.toggle('dark', this.theme === 'dark');
  }
}
