import {Component, computed, DestroyRef, effect, ElementRef, inject, signal, viewChild} from '@angular/core';
import {EasyFormControl, EfErrorsComponent} from "@yyasinaslan/easyform";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-otp-input',
  standalone: true,
  imports: [
    EfErrorsComponent,
    ReactiveFormsModule
  ],
  templateUrl: './otp-input.component.html',
  styleUrl: './otp-input.component.scss'
})
export class OtpInputComponent extends EasyFormControl {
  private destroyRef = inject(DestroyRef);
  private otpContainer = viewChild<ElementRef<HTMLDivElement>>('otpContainer');

  private valueSignal = signal(null)
  selectIndex = signal(1)

  readonly slots = computed(() => {
    const value = this.valueSignal() ?? '';
    const props = this.props();
    const size = props['size'];
    return Array.from({length: size}).map((_, i) => value[i] ?? '');
  })

  otpKey(event: KeyboardEvent, index: number) {
    const target = event.target as HTMLInputElement;
    event.preventDefault();
    if (event.key === 'Backspace') {
      target.value = '';
      this.applyValue();
      this.focusPrev(index);
    } else if (event.key === "ArrowLeft") {
      this.focusPrev(index);
    } else if (event.key === "ArrowRight") {
      this.focusNext(index);
    } else {
      if (!event.key.match(/[0-9]/)) {
        event.preventDefault();
        return;
      }
      target.value = event.key;
      this.applyValue();
      this.focusNext(index);
    }
  }

  constructor() {
    super();

    effect(() => {
      const control = this.control();
      if (control) {
        this.listenForValueChanges(control);
      }
    });
  }


  listenForValueChanges(control: FormControl) {
    control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
      this.valueSignal.set(value);
    })
  }


  private getInputAt(index: number) {
    return this.otpContainer()?.nativeElement.querySelector(`input:nth-child(${index + 1})`) as HTMLInputElement;
  }

  private applyValue() {
    // this.setValue(this.slots().map(i => this.getInputAt(i)?.value).join(''));
  }

  private focusPrev(index: number) {
    if (index > 0) {
      const input = this.getInputAt(index - 1);
      input?.focus();
      input?.select();
    }
  }

  private focusNext(index: number) {
    if (index < this.slots().length - 1) {
      const input = this.getInputAt(index + 1);
      input?.focus();
      input?.select();
    }
  }

  protected readonly Array = Array;

  calcSlots(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    if (event.key === 'Backspace') {
      this.selectIndex.set(Math.max(0, this.selectIndex() - 1));
    } else if (event.key === 'ArrowLeft') {

    } else if (event.key === 'ArrowRight') {

    } else if (event.key === 'Tab') {

    } else {
      if (!event.key.match(/[0-9]/)) {
        event.preventDefault();
        return;
      }
    }
  }

  updateSelectIndex(event: any) {
    const target = event.target as HTMLInputElement;
    const selectIndex = target.selectionStart;
    console.log('selectIndex', selectIndex)
    this.selectIndex.set(Math.max(1, selectIndex ?? 1));
  }
}
