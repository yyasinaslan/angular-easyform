import {isObservable, Observable} from "rxjs";
import {ChangeDetectorRef, isSignal, OnDestroy, Pipe, PipeTransform, Signal} from "@angular/core";
import {AsyncPipe} from "@angular/common";


/**
 * If we don't know string is observable or not. We can use this pipe.
 */
@Pipe({
  name: 'observe',
  pure: false,
  standalone: true
})
export class ObservePipe<T> implements PipeTransform, OnDestroy {

  private asyncPipe: AsyncPipe;

  constructor(private cdr: ChangeDetectorRef) {
    this.asyncPipe = new AsyncPipe(this.cdr);
  }

  transform(value: T | Signal<T> | Observable<T> | undefined | null): T | null {
    if (value === undefined) return null;

    if (isSignal(value)) {
      return value();
    }

    if (isObservable(value)) {
      return this.asyncPipe.transform(value);
    }

    return value;
  }

  ngOnDestroy(): void {
    this.asyncPipe.ngOnDestroy();
  }

}
