import {InjectionToken} from "@angular/core";
import {ComponentType} from "../interfaces/component-type";
import {EasyFormControl} from "easy-form";

export interface EasyFormConfig {
  // Custom form control components to be used in the form
  controls: Record<string, ComponentType<EasyFormControl>>;
}

const EASY_FORM_CONFIG_TOKEN = 'EASY_FORM_CONFIG_TOKEN';
export const EASY_FORM_CONFIG = new InjectionToken<EasyFormConfig>(EASY_FORM_CONFIG_TOKEN);
