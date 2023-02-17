import {FormControl} from "@angular/forms";

export interface IActivateFormGroup {
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}
