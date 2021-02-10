import { AbstractControl, Validators } from '@angular/forms';

export class CustomValidators extends Validators {
  static required(control: AbstractControl): {} {
    const baseRequired = Validators.required(control);
    const isRequired = baseRequired && baseRequired.required;
    return isRequired
      ? {
          required: {
            displayMessage: 'Please fill up the required field',
          },
        }
      : null;
  }
  static correctUnit(control: AbstractControl): {} {
    const correctValues = ['standart', 'imperial'];
    const contains = correctValues.includes(control.value);
    return contains
      ? null
      : {
          wrongValue: {
            displayMessage: 'Should contain valid value [standart,imperial]',
          },
        };
  }
}
