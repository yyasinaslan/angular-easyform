import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {EASY_FORM_CONFIG, EasyFormConfig, EfTextComponent} from "@yyasinaslan/easyform";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    {
      provide: EASY_FORM_CONFIG,
      useValue: {
        controls: {
          customText: () => import('@app/input-components/custom-text/custom-text.component').then(m => m.CustomTextComponent),
          number: EfTextComponent
        }
      } as EasyFormConfig
    },
  ]
};
