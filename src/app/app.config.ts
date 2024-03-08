import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {EASY_FORM_CONFIG, EasyFormConfig} from "../../projects/easy-form/src/lib/tokens/easy-form-config";
import {CustomTextComponent} from "./input-components/custom-text/custom-text.component";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), {
    provide: EASY_FORM_CONFIG,
    useValue: {
      controls: {
        customText: CustomTextComponent
      }
    } as EasyFormConfig
  }
  ]
};
