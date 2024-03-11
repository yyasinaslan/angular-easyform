import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', loadChildren: () => import('./website/website.routes')},
  {path: 'docs', loadChildren: () => import('./docs/docs.component')},
];
