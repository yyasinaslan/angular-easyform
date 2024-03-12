import {Component} from '@angular/core';
import {NgDocNavbarComponent, NgDocRootComponent, NgDocSidebarComponent} from "@ng-doc/app";
import {RouterLink, RouterOutlet, Routes} from "@angular/router";
import {NG_DOC_ROUTING} from "@ng-doc/generated";
import {ThemeSwitcherComponent} from "../ui/theme-switcher/theme-switcher.component";

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [
    NgDocNavbarComponent,
    NgDocRootComponent,
    NgDocSidebarComponent,
    RouterOutlet,
    RouterLink,
    ThemeSwitcherComponent
  ],
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.scss'
})
export class DocsComponent {

}

const routes: Routes = [
  {path: '', redirectTo: 'getting-started/introduction', pathMatch: 'full'},
  {
    path: '',
    component: DocsComponent,
    children: NG_DOC_ROUTING,
  },
];

export default routes;
