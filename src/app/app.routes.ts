import {Routes} from '@angular/router';
import {AlternativeSchemaComponent} from "./alternative-schema/alternative-schema.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {TableExampleComponent} from "./playground/table-example/table-example.component";

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'examples', component: AlternativeSchemaComponent},
  {path: 'array-table', component: TableExampleComponent},

];
