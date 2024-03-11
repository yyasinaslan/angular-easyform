import {NgDocPage} from '@ng-doc/core';
import GettingStartedCategory from "docs/getting-started/ng-doc.category";

const CustomComponentPage: NgDocPage = {
  title: `Custom Component`,
  mdFile: './index.md',
  order: 3,
  category: GettingStartedCategory
};

export default CustomComponentPage;
