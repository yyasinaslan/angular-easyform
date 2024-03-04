import {FormControl} from "@angular/forms";
import {FormField} from "./interfaces/form-field";

/**
 * Every form control should implement this interface
 * to work with EasyFormComponent
 */
export interface EasyFormControl {
  name: string; // Form control name as input

  formField: FormField;
  /**
   * Usage in component class:
   * formControl!: FormControl;
   */
  control: FormControl;

  /**
   * Usage in component class:
   * @Input() props?: Record<string, any>;
   */
  props?: Record<string, any>; // Additional props for the control
}
