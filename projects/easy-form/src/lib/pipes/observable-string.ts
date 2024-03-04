import {isObservable, Observable} from "rxjs";
import {ChangeDetectorRef, isSignal, OnDestroy, Pipe, PipeTransform, Signal} from "@angular/core";
import {AsyncPipe} from "@angular/common";

type StringLike = string | number;
export type ObservableString = StringLike | Signal<StringLike> | Observable<StringLike>;

/**
 * If we don't know string is observable or not. We can use this pipe.
 */
@Pipe({
  name: 'observableString',
  pure: false,
  standalone: true
})
export class ObservableStringPipe implements PipeTransform, OnDestroy {

  private asyncPipe: AsyncPipe;

  constructor(private cdr: ChangeDetectorRef) {
    this.asyncPipe = new AsyncPipe(this.cdr);
  }

  transform(value: ObservableString | undefined | null) {
    if (value === undefined) return '';

    if (isSignal(value)) {
      return value();
    }

    if (isObservable(value)) {
      return this.asyncPipe.transform(value);
    }

    return String(value);
  }

  ngOnDestroy(): void {
    this.asyncPipe.ngOnDestroy();
  }

}
