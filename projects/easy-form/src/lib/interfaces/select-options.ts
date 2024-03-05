import {Observable} from "rxjs";
import {Signal} from "@angular/core";
import {ObservableString} from "./observable-string";

export type SelectOption<T = any> = { label: ObservableString, value: T, disabled?: boolean, group?: ObservableString }
export type SelectOptions<T = any> = SelectOption<T>[] | Observable<SelectOption<T>[]> | Signal<SelectOption<T>[]>;
