import {NgDocPage} from '@ng-doc/core';
import BasicControlsCategory from '../ng-doc.category';
import {TextDemoComponent} from "@demos/text-demo/text-demo.component";

const TextPage: NgDocPage = {
  title: `Text`,
  mdFile: './index.md',
  category: BasicControlsCategory,
  demos: {
    textDemo: TextDemoComponent
  }
};

export default TextPage;
