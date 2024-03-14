import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  theme = localStorage.getItem('theme') || 'dark';

  constructor() {
    document.body.classList.toggle('dark', this.theme === 'dark');
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark', this.theme === 'dark');
    localStorage.setItem('theme', this.theme);
  }

}
