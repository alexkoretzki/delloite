import { AbstractControl } from '@angular/forms';

// @dynamic
export class ErrorService {
  static isFieldInvalid(control: AbstractControl): boolean {
    const shouldValidate: boolean = control.touched;
    const isInvalid: boolean = shouldValidate && control.invalid;
    return isInvalid;
  }
}
