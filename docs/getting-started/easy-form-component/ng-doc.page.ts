import {NgDocPage} from '@ng-doc/core';
import GettingStartedCategory from '../ng-doc.category';
import {LoginComponent} from "@demos/login/login.component";

const EasyFormComponentPage: NgDocPage = {
  title: `Easy Form Component`,
  mdFile: './index.md',
  category: GettingStartedCategory,
  order: 4,
  demos: {LoginComponent}
};

export default EasyFormComponentPage;
