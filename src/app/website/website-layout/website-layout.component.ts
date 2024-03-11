import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ThemeService} from "../../services/theme.service";
import {ThemeSwitcherComponent} from "../../ui/theme-switcher/theme-switcher.component";

@Component({
  selector: 'app-website-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ThemeSwitcherComponent
  ],
  templateUrl: './website-layout.component.html',
  styleUrl: './website-layout.component.scss'
})
export class WebsiteLayoutComponent {

  themeService = inject(ThemeService)


  protected readonly routes: { path: string, exact?: boolean, label: string }[] = [
    {path: '', exact: true, label: 'Home'},
    {path: '/docs/getting-started/introduction', label: 'Docs'},
    {path: '/examples', label: 'Examples'},
    {path: '/array-table', label: 'Array Table'},
    {path: '/events', label: 'Events'},
  ];
}
