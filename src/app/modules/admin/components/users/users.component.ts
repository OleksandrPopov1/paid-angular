import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

import {AdminService} from "../../services";
import {UserCreateFormComponent} from "../user-create-form/user-create-form.component";
import {IPaginated, IUser} from "../../../../share";
import {map} from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  dialogRef: MatDialogRef<UserCreateFormComponent>;
  page = 1;
  maxPage: number;
  isLoadingUsers = false;

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.bottomReached() && !this.isLoadingUsers && this.page < this.maxPage) {
      this.isLoadingUsers = true;
      this.page++;
      this.loadUsers(this.page);
    }
  }

  constructor(private adminService: AdminService, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this._initialData();
  }

  _initialData(): void {
    this.activatedRoute.data.pipe(
      map(data => data['admin'] as IPaginated<IUser>)
    ).subscribe(value => {
      this.users = value.results;
      this.maxPage = value.count / 9;
    });
  }

  loadUsers(page: number): void {
    this.adminService.getAll({page, size: 9}).subscribe(users => {
      this.users = [...this.users, ...users.results];
      this.isLoadingUsers = false;
    })
  }

  openCreateForm(): void {
    this.dialogRef = this.dialog.open(UserCreateFormComponent);
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.users.unshift(result.user)
      }
    })
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY + 100) >= document.body.scrollHeight;
  }
}
