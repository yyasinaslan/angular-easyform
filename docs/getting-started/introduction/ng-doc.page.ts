import {NgDocPage} from '@ng-doc/core';
import GettingStartedCategory from "docs/getting-started/ng-doc.category";
import {IntroductionDemoComponent} from "@demos/introduction-demo/introduction-demo.component";

const InstallationPage: NgDocPage = {
  title: `Introduction`,
  mdFile: './index.md',
  category: GettingStartedCategory,
  demos: {demo: IntroductionDemoComponent},
  order: 1,
};

export default InstallationPage;
