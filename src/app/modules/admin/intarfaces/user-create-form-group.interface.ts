import {FormControl} from "@angular/forms";

export interface IUserCreateFormGroup {
  name: FormControl<string>;
  surname: FormControl<string>;
  email: FormControl<string>;
}
