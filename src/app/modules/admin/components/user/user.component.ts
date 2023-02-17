import {Component, Input, OnInit} from '@angular/core';

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

  constructor(private adminService: AdminService) {
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

}
