import {ObservableString} from "easy-form";
import {Observable} from "rxjs";
import {Signal} from "@angular/core";

export type SelectItem = { label: ObservableString, value: any, disabled?: boolean, group?: ObservableString }
export type SelectItems = SelectItem[] | Observable<SelectItem[]> | Signal<SelectItem[]>;
