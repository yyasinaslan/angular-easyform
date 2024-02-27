import {Routes} from '@angular/router';
import {DefaultComponent} from "./default-example/default/default.component";
import {EfExampleComponent} from "./ef-example/ef-example.component";
import {EfClearExampleComponent} from "./ef-clear-example/ef-clear-example.component";
import {ExtendedComponent} from "./default-example/extended/extended.component";

export const routes: Routes = [
  {path: '', component: EfExampleComponent, pathMatch: 'full'},
  {path: 'clear', component: EfClearExampleComponent},
  {path: 'default', component: DefaultComponent},
  {path: 'extended', component: ExtendedComponent},

];
