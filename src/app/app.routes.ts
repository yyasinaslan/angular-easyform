import {Routes} from '@angular/router';
import {AlternativeSchemaComponent} from "./alternative-schema/alternative-schema.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  {path: '', component: AlternativeSchemaComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},

];
