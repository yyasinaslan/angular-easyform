import {InjectionToken} from "@angular/core";
import {ComponentType} from "../interfaces/component-type";
import {EasyFormControl} from "../easy-form-control";

export type EasyFormControlComponent = ComponentType<EasyFormControl>;
export type LazyLoadingComponent = () => Promise<any | EasyFormControlComponent>;

export interface EasyFormConfig {
  // Custom form control components to be used in the form
  controls: Record<string, EasyFormControlComponent | LazyLoadingComponent>;
}

const EASY_FORM_CONFIG_TOKEN = 'EASY_FORM_CONFIG_TOKEN';
export const EASY_FORM_CONFIG = new InjectionToken<EasyFormConfig>(EASY_FORM_CONFIG_TOKEN);
