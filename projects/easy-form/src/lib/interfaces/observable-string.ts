import {Observable} from "rxjs";
import {Signal} from "@angular/core";

export type ObservableString = string | Signal<string> | Observable<string>;
