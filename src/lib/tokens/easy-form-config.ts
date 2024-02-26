import {InjectionToken} from "@angular/core";


export interface EasyFormConfig {
  // Custom validators available to the form
  validators: any[];

  // Custom form control components to be used in the form
  controls: any[];

  // Schema adapter
  adapter?: any;
}

const EASY_FORM_CONFIG_TOKEN = 'EASY_FORM_CONFIG_TOKEN';
export const EASY_FORM_CONFIG = new InjectionToken<EasyFormConfig>(EASY_FORM_CONFIG_TOKEN);
