import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {AdminService} from "../../services";
import {IUser} from "../../../../share";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input()
  user: IUser;

  constructor(private adminService: AdminService, private router: Router) {
  }

  ngOnInit(): void {
    this._changeDate()
  }

  _changeDate(): void {
    this.user.create_at = new Date(this.user.create_at).toLocaleDateString();
    this.user.last_login = new Date(this.user.last_login).toLocaleDateString();
  }

  copyLinkActivation(): void {
    this.adminService.getTokenUser(this.user.id).subscribe(token => {
      const link = window.origin + `/login/activate/` + token;
      navigator.clipboard.writeText(link);
    })
  }

  banUser(): void {
    this.adminService.banUser(this.user.id).subscribe(() => {
      this.user.is_active = false;
    });
  }

  unbanUser(): void {
    this.adminService.unbanUser(this.user.id).subscribe(() => {
      this.user.is_active = true;
    });
  }

  showStatistic(): void {
    this.adminService.setCurrentUser(this.user);
    this.router.navigate([`admin/statistic/${this.user.id}`]);
  }

}
