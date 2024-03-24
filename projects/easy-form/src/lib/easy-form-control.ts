import {FormControl} from "@angular/forms";
import {computed, signal} from "@angular/core";
import {EasyFormField} from "./easy-form-field";


export interface EfControlData {
  id: string | null;
  control: FormControl | null;
  schema: EasyFormField | null;
  // formFieldDirective: FormFieldDirective | null;
}

/**
 * Every form control should extend this class
 * to work with EasyFormComponent
 */
export class EasyFormControl {
  // formFieldDirective = inject(FormFieldDirective, {optional: true});

  easyFormControl = signal<EfControlData>({
    id: null,
    control: null,
    schema: null,
    // formFieldDirective: null
  });

  control = computed(() => this.easyFormControl().control);

  schema = computed(() => this.easyFormControl().schema);

  // formFieldDirective = computed(() => this.easyFormControl().formFieldDirective);

  props = signal<Record<string, any>>({});

  hasControl = computed(() => this.easyFormControl().control !== null);

  hasInitialized = computed(() => {
    const efData = this.easyFormControl();
    return efData.control !== null && efData.schema !== null;
  });

  /**
   * Emit events
   * Usage: (input)="emitEvent($event)"
   * @param event
   */
  emitEvent = (event: Event) => {
    // const directive = this.formFieldDirective;
    // if (directive && directive.fieldEvent && directive.fieldEvent instanceof EventEmitter) {
    //   // Check if there are any subscribers to the event
    //   if (directive.fieldEvent.observed) {
    //     directive.fieldEvent.emit(event);
    //   }
    // }
  }
}
