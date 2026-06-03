import { FormGroup } from '@angular/forms';

export const confirmPasswordValidator = (controlName: string, controlNameToMatch: string) => {
  return (formGrup: FormGroup) => {
    let control = formGrup.controls[controlName];
    let controlToMatch = formGrup.controls[controlNameToMatch];

    if (control.errors && !control.errors['confirmPasswordValidator']) {
      return;
    }
    if (control.value !== controlToMatch.value) {
      controlToMatch.setErrors({ confirmPasswordValidator: true });
    } else {
      controlToMatch.setErrors(null);
    }
  };
};
