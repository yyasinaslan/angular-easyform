import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {WebsiteLayoutComponent} from "./website-layout/website-layout.component";
import {AlternativeSchemaComponent} from "../alternative-schema/alternative-schema.component";
import {TableExampleComponent} from "../demos/table-example/table-example.component";
import {EventsExampleComponent} from "../demos/events-example/events-example.component";

export const websiteChildrenRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {path: 'examples', component: AlternativeSchemaComponent},
  {path: 'array-table', component: TableExampleComponent},
  {path: 'events', component: EventsExampleComponent},
]

const websiteRoutes: Routes = [
  {
    path: '',
    component: WebsiteLayoutComponent,
    children: websiteChildrenRoutes
  }
]

export default websiteRoutes;
