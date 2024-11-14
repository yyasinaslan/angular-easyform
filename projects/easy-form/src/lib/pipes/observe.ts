import {isObservable, Observable} from "rxjs";
import {ChangeDetectorRef, inject, OnDestroy, Pipe, PipeTransform} from "@angular/core";
import {AsyncPipe} from "@angular/common";


/**
 * Observe both Observable and Signal values
 */
@Pipe({
  name: 'observe',
  pure: false,
  standalone: true
})
export class ObservePipe<T> implements PipeTransform, OnDestroy {
  private cdr = inject(ChangeDetectorRef);

  private asyncPipe: AsyncPipe;

  constructor() {
    this.asyncPipe = new AsyncPipe(this.cdr);
  }

  transform(value: T | Observable<T> | undefined | null): T | null {
    if (value === undefined) return null;

    if (isObservable(value)) {
      return this.asyncPipe.transform(value);
    }

    return value;
  }

  ngOnDestroy(): void {
    this.asyncPipe.ngOnDestroy();
  }

}
