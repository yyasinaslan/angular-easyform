import {Component, inject} from '@angular/core';
import {ThemeService} from "../services/theme.service";

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent {
  themeService = inject(ThemeService);

}
