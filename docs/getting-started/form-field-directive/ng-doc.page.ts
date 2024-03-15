import {NgDocPage} from '@ng-doc/core';
import GettingStartedCategory from '../ng-doc.category';
import {DynamicPathDemoComponent} from "@demos/dynamic-path-demo/dynamic-path-demo.component";

const FormFieldDirectivePage: NgDocPage = {
  title: `Form Field Directive`,
  mdFile: './index.md',
  category: GettingStartedCategory,
  order: 5,
  demos: {
    dynamicPath: DynamicPathDemoComponent
  }
};

export default FormFieldDirectivePage;
