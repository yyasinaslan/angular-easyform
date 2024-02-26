import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {EASY_FORM_CONFIG} from "../lib/tokens/easy-form-config";
import {EfTextComponent} from "../lib/controls/ef-text/ef-text.component";
import {EfSelectComponent} from "../lib/controls/ef-select/ef-select.component";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    // todo: Make components override existing config
    // {
    //   provide: EASY_FORM_CONFIG,
    //   useValue: {
    //     components: {
    //       text: EfTextComponent,
    //       select: EfSelectComponent,
    //     }
    //   }
    // }

  ]
};
