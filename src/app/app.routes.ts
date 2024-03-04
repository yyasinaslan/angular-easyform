import {Routes} from '@angular/router';
import {AlternativeSchemaComponent} from "./alternative-schema/alternative-schema.component";

export const routes: Routes = [
  {path: '', component: AlternativeSchemaComponent, pathMatch: 'full'},
  {path: 'alternative-schema', component: AlternativeSchemaComponent},

];
