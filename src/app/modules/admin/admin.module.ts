import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

import {AdminRoutingModule} from './admin-routing.module';
import {UserCreateFormComponent} from './components/user-create-form/user-create-form.component';
import {AdminComponent} from './components/admin/admin.component';
import {UserComponent} from './components/user/user.component';
import {UsersComponent} from './components/users/users.component';


@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,
    UsersComponent,
    UserCreateFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ]
})
export class AdminModule {
}
