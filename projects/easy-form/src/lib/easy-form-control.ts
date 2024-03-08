import {FormControl} from "@angular/forms";
import {FormField} from "./interfaces/form-field";
import {FormFieldDirective} from "./directives/form-field.directive";
import {computed, EventEmitter, signal} from "@angular/core";


export interface EfControlData {
  id: string | null;
  control: FormControl | null;
  schema: FormField | null;
  formFieldDirective: FormFieldDirective | null;
}

/**
 * Every form control should extend this class
 * to work with EasyFormComponent
 */
export class EasyFormControl {
  easyFormControl = signal<EfControlData>({
    id: null,
    control: null,
    schema: null,
    formFieldDirective: null
  });

  control = computed(() => this.easyFormControl().control);

  schema = computed(() => this.easyFormControl().schema);

  formFieldDirective = computed(() => this.easyFormControl().formFieldDirective);

  props = signal<Record<string, any>>({});

  hasControl = computed(() => this.easyFormControl().control !== null);

  hasInitialized = computed(() => {
    const efData = this.easyFormControl();
    return efData.control !== null && efData.schema !== null && efData.formFieldDirective !== null;
  });

  /**
   * Emit events
   * Usage: (input)="emitEvent($event)"
   * @param event
   */
  emitEvent = (event: Event) => {
    const directive = this.easyFormControl().formFieldDirective!;
    if (directive.fieldEvent && directive.fieldEvent instanceof EventEmitter) {
      directive.fieldEvent.emit(event);
    }
  }
}
