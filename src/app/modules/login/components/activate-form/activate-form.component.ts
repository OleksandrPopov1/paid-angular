import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';

import {AuthService} from "../../servisces";
import {IActivateFormGroup} from "../../interfacecs";

@Component({
  selector: 'app-activate-form',
  templateUrl: './activate-form.component.html',
  styleUrls: ['./activate-form.component.css']
})
export class ActivateFormComponent implements OnInit {
  form: FormGroup<IActivateFormGroup>;
  error = false;
  token: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private matDialogRef: MatDialogRef<ActivateFormComponent>,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this._initialForm();
    this.token = this.router.url.split('/').reverse()[0];
  }

  _initialForm(): void {
    this.form = new FormGroup<IActivateFormGroup>({
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,128}')
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,128}')
      ])
    })
  }

  activate(): void {
    if (this.form.value.password === this.form.value.confirmPassword) {
      this.authService.activate(this.form.value.password, this.token).subscribe(() => {
        this.error = false;
        this.matDialogRef.close();
        this.router.navigate(['/login'])
      });
    } else {
      this.error = true;
      this.form.reset();
    }
  }

  openSnackBar() {
    const message: string = 'The password must contain a lowercase letter, an uppercase letter, a number, a special character, and be no shorter than 8 characters!';
    const action: string = 'Close';

    this.snackBar.open(message, action, {verticalPosition: "top"});
  }

}
