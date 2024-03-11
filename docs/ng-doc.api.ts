import {NgDocApi} from '@ng-doc/core';

const Api: NgDocApi = {
  title: 'API Reference',
  scopes: [
    {
      name: 'EasyForm',
      route: 'easyform',
      include: 'projects/easy-form/src/public-api.ts'
    }
    // Add the paths to the source code of your project, based on which you want to generate the API here
  ],
  order: 10000
};

export default Api;
