import {NgDocPage} from '@ng-doc/core';
import AdvancedControlsCategory from '../ng-doc.category';
import {GroupDemoComponent} from "@demos/group-demo/group-demo.component";

const FormGroupPage: NgDocPage = {
  title: `Form Group`,
  mdFile: './index.md',
  category: AdvancedControlsCategory,
  order: 1,
  demos: {
    groupDemo: GroupDemoComponent
  }
};

export default FormGroupPage;
