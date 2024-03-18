import {NgDocPage} from '@ng-doc/core';
import AdvancedControlsCategory from '../ng-doc.category';
import {ArrayDemoComponent} from "@demos/array-demo/array-demo.component";

const FormArrayPage: NgDocPage = {
  title: `Form Array`,
  mdFile: './index.md',
  category: AdvancedControlsCategory,
  order: 2,
  demos: {
    arrayDemo: ArrayDemoComponent
  }
};

export default FormArrayPage;
