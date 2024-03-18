import {NgDocPage} from '@ng-doc/core';
import AdvancedControlsCategory from '../ng-doc.category';
import {GroupArrayDemoComponent} from "@demos/group-array-demo/group-array-demo.component";

const FormArrayWithGroupPage: NgDocPage = {
  title: `Form Array with Group`,
  mdFile: './index.md',
  category: AdvancedControlsCategory,
  order: 3,
  demos: {
    groupArrayDemo: GroupArrayDemoComponent
  }
};

export default FormArrayWithGroupPage;
