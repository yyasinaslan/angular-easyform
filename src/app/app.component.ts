import {NgDocNavbarComponent, NgDocRootComponent, NgDocSidebarComponent} from "@ng-doc/app";
import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {JsonPipe} from "@angular/common";
import {ThemeService} from "./services/theme.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, RouterLink, RouterLinkActive, NgDocRootComponent, NgDocNavbarComponent, NgDocSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  themeService = inject(ThemeService)

  title = 'easy-form-demo';

}
