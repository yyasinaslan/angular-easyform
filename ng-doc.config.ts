import {NgDocConfiguration} from "@ng-doc/builder";


const config: NgDocConfiguration = {
  repoConfig: {
    url: 'https://github.com/yyasinaslan/angular-easyform',
    mainBranch: 'main',
    releaseBranch: 'main',
  },
  pages: ['docs'],
  routePrefix: 'docs'
}


export default config;
