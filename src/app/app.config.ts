import {
  NG_DOC_DEFAULT_PAGE_PROCESSORS,
  NG_DOC_DEFAULT_PAGE_SKELETON,
  NgDocDefaultSearchEngine,
  provideMainPageProcessor,
  provideNgDocApp,
  providePageSkeleton,
  provideSearchEngine
} from "@ng-doc/app";
import {provideNgDocContext} from "@ng-doc/generated";
import {provideAnimations} from "@angular/platform-browser/animations";
import {ApplicationConfig, isDevMode} from '@angular/core';
import {NoPreloading, PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading} from '@angular/router';
import {EASY_FORM_CONFIG, EasyFormConfig} from "@yyasinaslan/easyform";
import {provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";
import {routes} from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: EASY_FORM_CONFIG,
      useValue: {
        controls: {
          customText: () => import('./input-components/custom-text/custom-text.component').then(m => m.CustomTextComponent),
        }
      } as EasyFormConfig
    },
    provideAnimations(),
    provideRouter(routes, withPreloading(isDevMode() ? NoPreloading : PreloadAllModules), withInMemoryScrolling({
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled"
    })),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideNgDocContext(),
    provideNgDocApp({
      themes: [
        {
          path: 'ngdoc-light.css',
          id: 'light'
        },
        {
          path: 'ngdoc-dark.css',
          id: 'dark'
        }
      ],
      defaultThemeId: 'light'
    }),
    provideSearchEngine(NgDocDefaultSearchEngine),
    providePageSkeleton(NG_DOC_DEFAULT_PAGE_SKELETON),
    provideMainPageProcessor(NG_DOC_DEFAULT_PAGE_PROCESSORS)]
};
