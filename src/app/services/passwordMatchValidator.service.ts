import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class passwordMatchValidatorService {

  constructor() { }

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      // reaching control of  form group elements
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
// if passwoord or confirmpassword does not exist(return null go directly to the other errors)
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
// if another error happens already in the  confirmpassword and mismatch did not happen (! for returning did not happen)(return null go directly to the other errors)
      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors["passwordMismatch"]
      ) {
        return null;
      }
        // if they did not match set the error (passwordmismatch) true and return true so you can show error message with this error
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
          return true;
      } else {
        // whenever they match return error to null so error will disappear go to the other errors
        confirmPasswordControl.setErrors(null);
          return null;
      }
    };
  }
}
