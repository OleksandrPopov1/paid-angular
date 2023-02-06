import {FormControl} from "@angular/forms";

export interface IEditeFormGroup {
  name: FormControl<string | null>;
  surname: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  age: FormControl<number | null>;
  course: FormControl<string | null>;
  course_format: FormControl<string | null>;
  course_type: FormControl<string | null>;
  sum: FormControl<number | null>;
  alreadyPaid: FormControl<number | null>;
  msg: FormControl<string | null>;
  status: FormControl<string | null>;
  group: FormControl<string | null>
}
