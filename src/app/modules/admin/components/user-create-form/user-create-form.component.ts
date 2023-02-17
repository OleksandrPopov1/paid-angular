import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

import {IUserCreate} from 'src/app/share';
import {AdminService} from "../../services";
import {IUserCreateFormGroup} from "../../intarfaces";


@Component({
  selector: 'app-user-create-form',
  templateUrl: './user-create-form.component.html',
  styleUrls: ['./user-create-form.component.css']
})
export class UserCreateFormComponent implements OnInit {
  form: FormGroup<IUserCreateFormGroup>;
  error = false;

  constructor(private adminService: AdminService, private matDialogRef: MatDialogRef<UserCreateFormComponent>) {
  }

  ngOnInit(): void {
    this._initialForm();
  }

  _initialForm(): void {
    this.form = new FormGroup<IUserCreateFormGroup>({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zа-яёіA-ZА-ЯЇЁ]+$'),
        Validators.minLength(1),
        Validators.maxLength(20)
      ]),
      surname: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zа-яёіA-ZА-ЯЇЁ]+$'),
        Validators.minLength(1),
        Validators.maxLength(20)
      ]),
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  createUser(): void {
    const newUser: IUserCreate = {
      email: this.form.value.email,
      profile: {
        name: this.form.value.name,
        surname: this.form.value.surname
      }
    }

    this.adminService.createUser(newUser).subscribe({
      next: (user) => {
        this.error = false;
        this.matDialogRef.close({user});
      },
      error: () => {
        this.error = true;
        this.form.reset();
      }
    })
  }

  closeDialog(): void {
    this.matDialogRef.close();
  }
}
