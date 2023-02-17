import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

import {AuthService} from "../../servisces";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  error = false;
  hidePassword = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private matDialogRef: MatDialogRef<LoginFormComponent>
  ) {
    this._initialForm();
  }

  ngOnInit(): void {
  }

  _initialForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login(): void {
    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.error = false;
        this.router.navigate(['/orders']);
        this.matDialogRef.close();
      },
      error: () => {
        this.error = true;
        this.form.reset();
      }
    })
  }
}
