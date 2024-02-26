import {InjectionToken} from "@angular/core";
import {EasyForm} from "../easy-form";


const EASY_FORM_TOKEN_NAME = 'EASY_FORM';
export const EASY_FORM = new InjectionToken<EasyForm>(EASY_FORM_TOKEN_NAME);
