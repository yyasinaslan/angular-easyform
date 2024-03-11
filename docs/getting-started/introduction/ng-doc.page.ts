import {NgDocPage} from '@ng-doc/core';
import GettingStartedCategory from "docs/getting-started/ng-doc.category";
import {LoginComponent} from "../../../src/app/demos/login/login.component";

const InstallationPage: NgDocPage = {
  title: `Introduction`,
  mdFile: './index.md',
  category: GettingStartedCategory,
  demos: {LoginComponent: LoginComponent},
  order: 1
};

export default InstallationPage;
